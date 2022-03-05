const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Stop the music',
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
    queue.stop()
    const msd = await message.channel.send(`${client.emotes.success} | Stopped!`)
    client.sleep(5000).then(() => msd.delete());
  }
}
