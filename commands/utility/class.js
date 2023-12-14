const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const apiUrl = 'https://api.open5e.com/v1/classes/';
module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('class')
    .setDescription('Replies with the description of the class')
    .addStringOption(option => 
        option.setName(`classes`)
            .setDescription(`The Class Options`)
            .setRequired(true)
            .addChoices(
                {name: 'Barbarian', value: 'Barbarian'},
                {name: 'Bard', value: 'Bard'},
                {name: 'Cleric', value: 'Cleric'},
                {name: 'Druid', value: 'Druid'},
                {name: 'Fighter', value: 'Fighter'},
                {name: 'Monk', value: 'Monk'},
                {name: 'Paladin', value: 'Paladin'},
                {name: 'Ranger', value: 'Ranger'},
                {name: 'Rogue', value: 'Rogue'},
                {name: 'Sorcerer', value: 'Sorcerer'},
                {name: 'Warlock', value: 'Warlock'},
                {name: 'Wizard', value: 'Wizard'},
            )),
    async execute(interaction){
        await interaction.deferReply();
        const className = interaction.options.getString('classes');
        await wait(4000);
        getClassDescription(className)
            .then(description => {
                console.log('Class Description: ', description)
                interaction.editReply(interaction.editReply(`Class Description: \n${description}`));
            })
            .catch(error => {
                console.error('Error:', error)
                interaction.editReply('Error fetching class description.');
            });
    }

};

function getClassDescription(className) {
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then(response => {
            response.json()
            console.log('Raw API Response:', response);
        })
        .then(data => {
          const targetClass = data.results.find(classData => classData.name === className);
  
          if (targetClass) {
            const description = targetClass.desc;
            resolve(description);
          } else {
            reject(new Error('Class not found.'));
          }
        })
        .catch(error => reject(error));
    });
  }