    const { SlashCommandBuilder } = require('discord.js');

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
            try {
                // Fetch the first page to get information about the total number of monsters
                const cr = interaction.options.getInteger('cr');
                const firstPageResponse = await fetch(`https://api.open5e.com/v1/monsters/?cr=${cr}&page=1`);
                const firstPageData = await firstPageResponse.json();

                // Check if the 'results' property exists in the first page response
                if (firstPageData.results && firstPageData.results.length > 0) {
                    // Calculate total number of pages
                    const pageSize = firstPageData.results.length; // Assuming page size is equal to the number of results per page
                    const totalMonsters = firstPageData.count;
                    const totalPages = Math.ceil(totalMonsters / pageSize);

                    // Select a random page within the total number of pages
                    const randomPage = Math.floor(Math.random() * totalPages) + 1;
                    console.log(`Random Page: ${randomPage} out of ${totalPages}`);

                    // Now make the actual API call with the updated randomPage value
                    const response = await fetch(`https://api.open5e.com/v1/monsters/?cr=${cr}&page=${randomPage}`);
                    const data = await response.json();

                    // Continue with the rest of your code using data.results
                    if (data.results && data.results.length > 0) {
                        const randomIndex = Math.floor(Math.random() * data.results.length);
                        const randomMonster = data.results[randomIndex];

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

                } else {
                    console.error('Error: No results found in the first page response');
                    interaction.followUp('Error: No results found. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching monster data:', error);
                interaction.followUp('Error fetching monster data. Please try again.');
            }  
        }
    };