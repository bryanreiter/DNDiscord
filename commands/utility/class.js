const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("class")
    .setDescription("Provides Description of Classes"),

  async execute(interaction) {
    await interaction.deferReply();

    const barbarian = new ButtonBuilder()
      .setCustomId("barbarian")
      .setLabel("Barbarian")
      .setStyle(ButtonStyle.Primary);

    const bard = new ButtonBuilder()
      .setCustomId("bard")
      .setLabel("Bard")
      .setStyle(ButtonStyle.Primary);

    const cleric = new ButtonBuilder()
      .setCustomId("cleric")
      .setLabel("Cleric")
      .setStyle(ButtonStyle.Primary);

    const druid = new ButtonBuilder()
      .setCustomId("druid")
      .setLabel("Druid")
      .setStyle(ButtonStyle.Primary);

    const fighter = new ButtonBuilder()
      .setCustomId("fighter")
      .setLabel("Fighter")
      .setStyle(ButtonStyle.Primary);

    const monk = new ButtonBuilder()
      .setCustomId("monk")
      .setLabel("Monk")
      .setStyle(ButtonStyle.Primary);

    const paladin = new ButtonBuilder()
      .setCustomId("paladin")
      .setLabel("Paladin")
      .setStyle(ButtonStyle.Primary);

    const ranger = new ButtonBuilder()
      .setCustomId("ranger")
      .setLabel("Ranger")
      .setStyle(ButtonStyle.Primary);

    const rogue = new ButtonBuilder()
      .setCustomId("rogue")
      .setLabel("Rogue")
      .setStyle(ButtonStyle.Primary);

    const sorcerer = new ButtonBuilder()
      .setCustomId("sorcerer")
      .setLabel("Sorcerer")
      .setStyle(ButtonStyle.Primary);

    const warlock = new ButtonBuilder()
      .setCustomId("warlock")
      .setLabel("Warlock")
      .setStyle(ButtonStyle.Primary);

    const wizard = new ButtonBuilder()
      .setCustomId("wizard")
      .setLabel("Wizard")
      .setStyle(ButtonStyle.Primary);

    const row1 = new ActionRowBuilder().addComponents(
      barbarian,
      bard,
      cleric,
      druid
    );

    const row2 = new ActionRowBuilder().addComponents(
      fighter,
      monk,
      paladin,
      ranger
    );

    const row3 = new ActionRowBuilder().addComponents(
      rogue,
      sorcerer,
      warlock,
      wizard
    );

    await interaction.followUp({
      content: `What class would you like to check out?`,
      components: [row1, row2, row3],
    });
  },
};
