const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'playskip',
  aliases: ['ps'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Jump into a new song without putting the song in queue',
  cooldown: 5,
  usage: '<song-url> or <query>',
  inVoiceChannel: true,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  inVoiceChannel: true,
  run: async (client, message, args) => {
    message.delete();
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
  }
}
