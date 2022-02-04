const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
  name: 'filter',
  aliases: ['filters'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'For filters!',
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
  run: async (client, message, args) => {
    message.delete();
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (args[0]) return message.channel.send(`${client.emotes.error} | Not a valid filter, try \`-filterlist\`/\`-fl\``).then((msg) => {
      setTimeout(() => msg.delete(), ms('5 seconds'))
  });
    message.channel.send(`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``)
  }
}
