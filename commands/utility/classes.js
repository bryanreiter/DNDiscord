const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const { fetchClasses } = require("./apiHandler");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("classes")
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

    const classRow1 = new ActionRowBuilder().addComponents(
      barbarian,
      bard,
      cleric,
      druid
    );

    const classRow2 = new ActionRowBuilder().addComponents(
      fighter,
      monk,
      paladin,
      ranger
    );

    const classRow3 = new ActionRowBuilder().addComponents(
      rogue,
      sorcerer,
      warlock,
      wizard
    );

    const reply = await interaction.followUp({
      content: `What class would you like to check out?`,
      components: [classRow1, classRow2, classRow3],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    try {
      const choice = await reply.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });
      if (choice.customId === "barbarian") {
        console.log(choice.customId);
        const data = await fetchClasses(choice.customId);

        const classesEmbed = new EmbedBuilder()
          .setColor("Blurple")
          .setTitle(data.name);

        await choice.update({
          embeds: [classesEmbed],
          components: [],
        });
      }
    } catch (e) {
      await interaction.editReply({
        content:
          "Choice not received within 1 minute, cancelling. Please run the command again.",
        components: [],
      });
    }
    // Embed featuring class details with interaction buttons for subclasses they can view as well as a back button
    // Embed for selected subclass as well as a back button
  },
};
