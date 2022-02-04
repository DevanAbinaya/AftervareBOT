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
            .setDescription(`"bassboost": "Bassboost",
            "vaporwave": "Vaporwave",
            "nightcore": "Nightcore",
            "phaser":  "Phaser",
            "tremolo":  "Tremolo",
            "reverse": "Reverse",
            "karaoke": "Karaoke",
            "flanger": "Flanger",
            "gate": "Gate",
            "haas": "Haas",
            "mcompand": "Mcompand"`)
            .setColor("GREEN")

        message.channel.send({embeds: [listEmbed]})


   }
 }  