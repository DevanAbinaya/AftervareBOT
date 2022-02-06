const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config/config.json').prefix;
const prefixSchema = require('../../models/prefix');

module.exports = {
    name: 'resetprefix',
    aliases: ['pr', 'prefixreset'], 
    categories: 'mod', 
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    ownerOnly: true,
    description: 'Reset prefix in server!',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
        message.channel.send(`The prefix has been reset to ${prefix}`)
   }
 } 