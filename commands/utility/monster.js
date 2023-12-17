const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("monster")
    .setDescription("Looks up a monster based on your input")
    .addStringOption((option) =>
      option.setName("monster").setDescription("input").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      let monster = interaction.options.getString("monster");
      monster = monster.toLowerCase();

      //build first request to get details
      const response1 = await fetch(
        `https://www.dnd5eapi.co/api/monsters/${monster}`
      );
      const dnd5eData = await response1.json();

      //new request to get description and other details not in dnd5eapi (if given)
      const response2 = await fetch(
        `https://api.open5e.com/v1/monsters/?name=${monster}`
      );
      const open5eData = await response2.json();

      const desc = dnd5eData.desc
        ? dnd5eData.desc
        : open5eData.desc
          ? open5eData.desc
          : "";
      //Build the embed
      const embed = new EmbedBuilder()
        .setColor(330066)
        .setTitle(dnd5eData.name)
        .setURL(`https://github.com/bryanreiter/DNDiscord`)
        .setAuthor({ name: `DNData` })
        .setDescription(
          dnd5eData.desc
            ? dnd5eData.desc
            : open5eData.desc
              ? open5eData.desc
              : ""
        )
        .setThumbnail("https://i.imgur.com/yir0sLN.png")
        .addFields(
          {
            name: "Size",
            value: dnd5eData.size ? dnd5eData.size : open5eData.size,
            inline: true,
          },
          {
            name: "Type",
            value: dnd5eData.type ? dnd5eData.type : open5eData.type,
            inline: true,
          },
          {
            name: "Alignment",
            value: dnd5eData.alignment
              ? dnd5eData.alignment
              : open5eData.alignment,
            inline: true,
          },
          {
            name: "Armor Class",
            value: dnd5eData.armor_class.value
              ? dnd5eData.armor_class.value
              : open5eData.armor_class,
            inline: true,
          }
        )
        .setImage(`https://www.dnd5eapi.co${dnd5eData.image}`)
        .setTimestamp()
        .setFooter({
          text: "Powered by Discord.js",
          iconURL:
            "https://preview.redd.it/voqvc1bdstk61.png?auto=webp&s=c0d826236ebba5ed183776cc9c56119cbf4a8372",
        });
      interaction.followUp({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching monster data:", error);
      interaction.followUp("Error fetching monster data. Please try again.");
    }
  },
};
