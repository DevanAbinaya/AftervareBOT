const { Client, Message, MessageEmbed } = require('discord.js');
const { sleep } = require('../..');
const ms = require('ms');

module.exports = {
  name: 'play',
  aliases: ['p'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Play the music',
  cooldown: 5,
  usage: '<Song title> or <link>',
  inVoiceChannel: true,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    message.delete();
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`).then((msg) => {
      setTimeout(() => msg.delete(), ms('5 seconds'))
  });
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
