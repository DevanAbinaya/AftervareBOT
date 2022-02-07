const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'filter-list',
    aliases: ['fl'], 
    categories: 'music', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Show all the filter list!',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const listEmbed = new MessageEmbed()
            .setTitle("Music Filter!")
            .setDescription(`"3d"\n"bassboost"\n"echo"\n"karaoke"\n"nightcore"\n"vaporwave"\n"flanger"\n"gate"\n"haas"\n"reverse"\n"surround"\nmcompand"\n"phaser"\n"tremolo"\n"earwax"`)
            .setColor("GREEN")

        message.channel.send({embeds: [listEmbed]})


   }
 }  