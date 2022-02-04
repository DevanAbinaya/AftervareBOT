const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'seek',
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Seek to the time in song',
  cooldown: 5,
  usage: '<posisiton-in-seconds>',
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
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Please provide position (in seconds) to seek!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
    queue.seek(time)
    message.channel.send(`Seeked to ${time}!`)
  }
}
