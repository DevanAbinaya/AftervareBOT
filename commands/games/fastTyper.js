const { Client, Message, MessageEmbed } = require('discord.js');
const { FastTyper } = require('../../assets/modules/djs-games')

module.exports = {
    name: 'fasttyper',
    aliases: ['ft', 'fasttype'], 
    categories: 'games', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Play Rock Paper Scissors with your friends!',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const game = new FastTyper({
            message: message,
          })
          game.start()
          
   }
 }