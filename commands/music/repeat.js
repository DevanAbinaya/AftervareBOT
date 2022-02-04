const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  categories: 'music',
  userperm: [],
  botperm: [],
  ownerOnly: false,
  description: 'Loop the song!',
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
    const Embed = new MessageEmbed()
      .setTitle("<:error:939189126786318336> Oops my bad")
      .setDescription("I'm really sorry that currently this command is still in developement.\n> Please wait in patience until we fix this!")
      .setColor("DARK_RED")
      .setTimestamp()

    message.channel.send({embeds: [Embed]})
//    const queue = client.distube.getQueue(message)
//    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
//    let mode = null
//    switch (args[0]) {
//      case 'off':
//        mode = 0
//        break
//      case 'song':
//        mode = 1
//        break
//      case 'queue':
//        mode = 2
//        break
//    }
//    mode = queue.setRepeatMode(mode)
//    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
//    message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
  }
}
