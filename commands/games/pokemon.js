const { Client, Message, MessageEmbed } = require('discord.js');
const { Pokemon } = require('djs-games');


module.exports = {
    name: 'pokewho',
    aliases: ['poke'], 
    categories: 'games', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: "Who's that Pokemon?!",
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const game = new Pokemon({
            message: message,
            token: 'dagpi-token-here', // Get Your Api Token at https://dagpi.xyz/dashboard
            winMessage: 'You Win!',
            loseMessage: 'You Lose!',
            wrongGuess: 'Wrong Guess!',
            stopCommand = 'stop',
            maxAttempts: 10,
          })
          game.start()
   }
 }  