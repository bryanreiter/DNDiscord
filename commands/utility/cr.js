const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('cr')
    .setDescription('Provides a random monster with the CR of your choosing')
    .addIntegerOption(option => 
        option
            .setName('cr')
            .setDescription('CR Number')
            .setRequired(true)),
    async execute(interaction){
        await interaction.deferReply();
        const cr = interaction.options.getInteger('cr');
        const randomPage = Math.floor(Math.random() * 5) + 1;
        console.log(randomPage);
        console.log(`CR: ${cr}`);
        await wait(4000)
        try {
            const response = await fetch(`https://api.open5e.com/v1/monsters/?cr=${cr}&page=${randomPage}`);
            const data = await response.json();

            // Check if the 'results' property exists in the API response
            if (data.results && data.results.length > 0) {
                // Select a random monster from the array
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMonster = data.results[randomIndex];

                // Log information about the randomly selected monster
                console.log(`Randomly Selected Monster:`);
                console.log(`Monster Name: ${randomMonster.name}`);
                console.log(`Size: ${randomMonster.size}`);
                console.log(`Type: ${randomMonster.type}`);
                console.log(`Alignment: ${randomMonster.alignment}`);

                const monsterInfo = `Random Monster with CR ${cr}:\n` +
                    `Name: ${randomMonster.name}\n` +
                    `Size: ${randomMonster.size}\n` +
                    `Type: ${randomMonster.type}\n` +
                    `Alignment: ${randomMonster.alignment}`;

                interaction.editReply(monsterInfo);
            } else {
                console.error('Error: No results found in the API response');
                interaction.followUp('Error: No results found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching monster data:', error);
            interaction.followUp('Error fetching monster data. Please try again.');
        }  
    }
};