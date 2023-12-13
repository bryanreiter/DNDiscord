const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with what you said!')
    .addStringOption(option => 
        option
            .setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)),
    async execute(interaction){
        await interaction.deferReply();
        await wait(2000)
        const input = interaction.options.getString('input')
        await interaction.editReply({content: `${input}`})
    }
};

