const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Change the volume',
  cooldown: 5,
  usage: '<volume>',
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
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
    queue.setVolume(volume)
    const msd = await message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``)
    client.sleep(5000).then(() => msd.delete());
  }
}
