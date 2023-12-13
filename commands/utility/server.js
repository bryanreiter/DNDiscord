const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
    async execute(interaction){
        // interaction.guild is the object representing the Guild in which the command was run
        await interaction.deferReply();
        await wait(4000);
		await interaction.editReply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
}