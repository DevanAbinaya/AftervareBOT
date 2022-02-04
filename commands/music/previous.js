const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'previous',
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Play previous song',
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
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Now playing:\n${song.name}`)
  }
}
