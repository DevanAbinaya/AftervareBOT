const { Client, Message, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../models/prefix');

module.exports = {
    name: 'setprefix',
    aliases: ['sp', 'prefixset'], 
    categories: 'owner', 
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    ownerOnly: true,
    description: 'Set bot prefix in server!',
    cooldown: 5,
    usage: '<new-prefix>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
   }
 }

