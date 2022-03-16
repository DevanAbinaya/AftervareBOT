const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionCollector } = require('discord-collector');

module.exports = {
    name: 'nuke',
    aliases: [], 
    categories: 'mod', 
    userperm: ['ADMINISTRATOR'],
    botperm: ['ADMINISTRATOR'],
    ownerOnly: false,
    description: 'Delete channel and create a clone of the channel',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const botMessage = await message.channel.send('Are you sure you want to nuke this channel?');
        if (await ReactionCollector.yesNoQuestion({ botMessage, user: message.author })) {
            let ch = await message.channel.clone()
            await message.channel.delete()
            await ch.send('Done!');
        }
        else {
            await botMessage.edit('Ok, operation cancelled!');
        }
    
   }
 } 