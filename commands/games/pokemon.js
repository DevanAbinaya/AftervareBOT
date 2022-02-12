const { Client, Message, MessageEmbed } = require('discord.js');
const { Pokemon } = require('../../assets/modules/djs-games');


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
            token: 'MTY0NDY1MjYwNw.dUzqnFnMP3FTkBkmWOTZXdlMiwmQO57V.08298f69fcd5fbad', // Get Your Api Token at https://dagpi.xyz/dashboard
            maxAttempts: 10,
          })
          game.start()
   }
 }  