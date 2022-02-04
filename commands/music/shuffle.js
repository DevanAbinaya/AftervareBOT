const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'shuffle',
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Shuffles song in the queue',
  cooldown: 5,
  usage: '',
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
    queue.shuffle()
    message.channel.send('Shuffled songs in the queue')
  }
}
