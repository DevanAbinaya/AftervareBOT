const { Client, Message, MessageEmbed } = require('discord.js');
const akinator = require("../../assets/discord.js-akinator");

module.exports = {
    name: 'akinator',
    aliases: ['aki'], 
    categories: 'games', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: "I'll guess your character!",
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        akinator(message, client);
   }
 }  