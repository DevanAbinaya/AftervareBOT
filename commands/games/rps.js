const { Client, Message, MessageEmbed } = require('discord.js');
const { RockPaperScissors } = require('../../assets/modules/djs-games')

module.exports = {
    name: 'rps',
    aliases: ['rockpaperscissors'], 
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
        const game = new RockPaperScissors({
            message: message,
          })
          game.start()
          
   }
 }      