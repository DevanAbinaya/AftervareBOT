const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'connect',
    aliases: ['connect4', 'connectdots'], 
    categories: 'games', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Connect 4 dots',
    cooldown: 5,
    usage: '<opponent>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const { ConnectFour } = require('djs-games')
        const game = new ConnectFour({
          message: message,
          player1: '🔴',
          player2: ':blue_circle:',
        })
        game.start()
   }
 }     