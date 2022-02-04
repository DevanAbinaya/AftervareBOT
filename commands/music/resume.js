const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Resume the paused song',
  cooldown: 5,
  usage: ' ',
  inVoiceChannel: true,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  inVoiceChannel: true,
  run: async (client, message) => {
    message.delete();
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.resume()
    message.channel.send('Resumed the song for you :)')
  }
}
