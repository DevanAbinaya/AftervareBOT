const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Pause the music',
  cooldown: 5,
  usage: '',
  inVoiceChannel: true,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message) => {
    message.delete();
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.pause()
    const msd = await message.channel.send('Paused the song for you :)')
    client.sleep(5000).then(() => msd.delete());
  }
}
