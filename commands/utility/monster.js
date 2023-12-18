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
      if (monsterData.name === "N/A") {
        const errorEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("No Monster Found")
          .setURL(`https://www.aidedd.org/dnd/monstres.php?vo=${monster}`)
          .setDescription(
            `No monster was found in the APIs for your request of **${monster}**\nThis is because the 5th Edition SRD Compendium can only contain information (such as race and class options, feats, spells, treasure, monsters, etc.) that is located within WoTC's Systems Reference Document. If WoTC releases more SRD content under an Open Gaming License, you can count on that being added to the Compendium. If you are sure your monster exists, click the link above.`
          );
        interaction.followUp({ embeds: [errorEmbed] });
      } else {
        //Build the embed
        const embed1 = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle(monsterData.name)
          .setURL(`https://roll20.net/compendium/dnd5e/${roll20URL}`)
          .setDescription(monsterData.description)
          .setImage(`https://www.dnd5eapi.co${dnd5eData.image}`)
          .setTimestamp()
          .setFooter({
            text: "Powered by Discord.js",
            iconURL:
              "https://preview.redd.it/voqvc1bdstk61.png?auto=webp&s=c0d826236ebba5ed183776cc9c56119cbf4a8372",
          });

        const embed2 = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle("Information")
          .setURL(`https://roll20.net/compendium/dnd5e/${roll20URL}`)
          .setDescription(`Some information about ${monsterData.name}`)
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
              name: "CR",
              value: `${monsterData.cr}`,
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
            }
          )
          .setTimestamp();
        const embed3 = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle("Special Abilities and Actions")
          .setURL(`https://roll20.net/compendium/dnd5e/${roll20URL}`)
          .setDescription(`Some stats for ${monsterData.name}`)
          .setTimestamp();
        // embed3.addFields({
        //   name: "=-=-=-=Special Abilities=-=-=-=",
        //   value: "** **",
        // });
        for (const special of monsterData.specials) {
          embed3.addFields({
            name: special.name,
            value: special.value,
          });
        }
        // embed3.addFields({ name: "=-=-=-=Actions=-=-=-=", value: "** **" });
        for (const action of monsterData.actions) {
          embed3.addFields({
            name: action.name,
            value: `${action.value}\nDamage Dice: ${action.damage_dice}`,
          });
        }
        interaction.followUp({ embeds: [embed1] });
        interaction.followUp({ embeds: [embed2] });
        interaction.followUp({ embeds: [embed3] });
      }
    } catch (error) {
      console.error("Error fetching monster data:", error);
      interaction.followUp("Error fetching monster data. Please try again.");
    }
  },
};
