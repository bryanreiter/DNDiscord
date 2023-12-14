const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { userMention } = require('discord.js')

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a dice. Ex: 1D6, 2D10')
    .addStringOption((option) =>
      option
        .setName('rolls')
        .setDescription("What's your roll")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply(`Rolling . . .`);
    try {
      // Parse string, split based on +, -, *, /, then take the ordered array and do calculations
      const input = interaction.options.getString('rolls');
      let rolls = input.split(/\s*([+\-/*])\s*/).map((roll) => roll.trim());
      // Splits like ["2d6", "+", "6d10"]
      console.log(rolls);

      let result = 0;
      let operation = '+';
      let rollResults = [];
      for (let roll of rolls) {
        if (['+', '-', '*', '/'].includes(roll)) {
          operation = roll;
        } else {
          let rollResult = 0;
          let individualRolls = [];
          if (roll.includes('d') || roll.includes('D')) {
            let [diceCount, diceSides] = roll.split(/d/i).map(Number);
            for (let i = 0; i < diceCount; i++) {
              let individualRoll = Math.floor(Math.random() * diceSides); //Random Roll
              rollResult += individualRoll;
              individualRolls.push(individualRoll);
            }
          } else {
            rollResult = Number(roll);
            individualRolls.push(rollResult);
          }

          rollResults.push(individualRolls);

          switch (operation) {
            case '+':
              result += rollResult;
              break;
            case '-':
              result -= rollResult;
              break;
            case '*':
              result *= rollResult;
              break;
            case '/':
              result /= rollResult;
              break;
          }
        }
      }
      console.log(rollResults);
      interaction.editReply(
        `Results of \`${input}\`: \`${rollResults
          .map((roll) => `[${roll.join(', ')}]`)
          .join(', ')}\` = \`${result}\``
      );
    } catch (err) {
      console.error('Error: Dice Rolling Failed', err);
      interaction.followUp(
        'Error: Dice Rolling Failed. Please make sure your input is in the correct format (e.g., 2d4 + 1d6).'
      );
    }
  },
};
