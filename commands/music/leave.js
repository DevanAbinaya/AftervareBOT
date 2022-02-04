const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'leave',
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Let the bot leave voice channel!',
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
    client.distube.voices.leave(message)
  }
}
