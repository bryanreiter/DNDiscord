const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  fetchDnd5eMonster,
  fetchOpen5eMonster,
  getMonsterData,
} = require("./apiHandler");

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
      //Removes any spaces and replaces with '_' for roll20 URL
      let roll20URL = monster.replace(/\s+/g, "_").toLowerCase();
      // Removes any spaces and replaces with '-' for APIs.
      monster = monster.replace(/\s+/g, "-").toLowerCase();

      const dnd5eData = await fetchDnd5eMonster(monster);
      const open5eData = await fetchOpen5eMonster(monster);

      //Set Monster Data
      const monsterData = getMonsterData(dnd5eData, open5eData);

      //Build the embed
      const embed = new EmbedBuilder()
        .setColor(330066)
        .setTitle(monsterData.name)
        .setURL(`https://roll20.net/compendium/dnd5e/${roll20URL}`)
        .setAuthor({ name: `DNData` })
        .setThumbnail("https://i.imgur.com/yir0sLN.png")
        .setDescription(monsterData.description)
        .addFields(
          {
            name: "Size",
            value: monsterData.size,
            inline: true,
          },
          {
            name: "Type",
            value: monsterData.type,
            inline: true,
          },
          {
            name: "Alignment",
            value: monsterData.alignment,
            inline: true,
          },
          {
            name: "Armor Class",
            value: `${monsterData.ac}`,
            inline: true,
          },
          {
            name: "Hit Points",
            value: `${monsterData.hit_points}`,
            inline: true,
          },
          {
            name: "Hit Dice",
            value: `${monsterData.hit_dice}`,
            inline: true,
          },
          {
            name: "CR",
            value: `${monsterData.cr}`,
          },
          //{ name: "\u200B", value: "\u200B" },
          {
            name: "STR",
            value: `${monsterData.str}`,
            inline: true,
          },
          {
            name: "DEX",
            value: `${monsterData.dex}`,
            inline: true,
          },
          {
            name: "CON",
            value: `${monsterData.cons}`,
            inline: true,
          },
          {
            name: "INT",
            value: `${monsterData.intell}`,
            inline: true,
          },
          {
            name: "WIS",
            value: `${monsterData.wisdom}`,
            inline: true,
          },
          {
            name: "CHA",
            value: `${monsterData.charis}`,
            inline: true,
          },
          
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
