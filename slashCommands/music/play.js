const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song!',
    userperm: [],
    botperm: [],
    ownerOnly: false,
    options: [
      {
        name: "song",
        description: "Please type a song title/url here!",
        type: "STRING",
      }
  ],
  
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const string = interaction.options.getString('song');
        if (!string) return interaction.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`).then((msg) => {
          setTimeout(() => msg.delete(), ms('5 seconds'))
      });
        await interaction.reply({content: 'Playing a song!', ephemeral: true})
        client.distube.play(interaction.member.voice.channel, string, {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction
        })
    }
 } 