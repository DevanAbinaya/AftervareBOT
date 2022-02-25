const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'say',
    description: 'Let the bot say what you type',
    userperm: [],
    botperm: [],
    ownerOnly: false,
    options: [
      {
        name: "text",
        description: "Text you want me to say",
        type: "STRING",
        required: true,
      }
  ],
  
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        await interaction.deferReply();
        await interaction.editReply({ content: "ㅤ",
        ephemeral: true }).then((msg) => {
            setTimeout(() => msg.delete(), ms('1 seconds'))
        });
        interaction.channel.send(interaction.options.data[0].value);
    }
 } 