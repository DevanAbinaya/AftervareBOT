const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'queue',
  aliases: ['q'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Show server queue',
  cooldown: 5,
  usage: ' ',
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
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
