const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    ownerOnly: false,
    description: 'show Bot Latency',
    userperm: [],
    botperm: [],
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
      //  interaction.editReply({content : `Ping : ${client.ws.ping}`})
      await interaction.deferReply();
      let circles = {
        green: "<a:Online_Ping:866085733534269440>",
        yellow: "<a:yellowloading:865563744162283541>",
        red: "<a:red:865563826123964416>"
    }
    const pingEmbed = new MessageEmbed()
        
        .setDescription(
            `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
        )
    interaction.followUp({ embeds: [pingEmbed] });

    }
}
