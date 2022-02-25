const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: 'translate',
    description: 'Translate a message!',
    userperm: [],
    botperm: [],
    ownerOnly: false,
    options: [
        {
            name: 'language',
            description: 'Language to which the message should be translated!',
            type: 'STRING',
            required: true
        },
        {
            name: 'message',
            description: 'Message to be translated',
            type: 'STRING',
            required: true
        },
  ],
  
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        await interaction.deferReply();
        const language = interaction.options.getString('language')
        const query = interaction.options.getString('message')
        
        
        const translated = await translate(query, { to: `${language}`});
        interaction.followUp({ content: `${translated.text}`});
    }
 }