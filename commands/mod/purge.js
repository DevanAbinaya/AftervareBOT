const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'clear',
    aliases: ['purge'], 
    categories: 'mod', 
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    description: 'Delete messages from the channel',
    cooldown: 5,
    usage: '<amount of messages>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        await message.delete();
        let amount = Number(args[0], 10) || parseInt(args[0]);
        if (isNaN(amount) || !Number.isInteger(amount)) {
          return message.channel.send("Please enter a number of messages to purge.", {
            message
          });
        } else if (!amount || amount < 2) {
          return message.channel.send("Please enter a number of message between 2", {
            message
          });
        }
        if (amount <= amount + 200) {
          if (Math.floor(amount / 100) % 100 === 0) {
            message.channel.bulkDelete(amount, true).then(m => {
              message.channel.send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
                timeout: 4000,
                message
              });
            });
          } else if (Math.floor(amount / 100) % 100) {
            setTimeout(() => {
              for (let i = 0; i < Math.floor(amount / 100) % 100; i++) {
                message.channel.bulkDelete(100, true);
              }
            }, 1000);
            setTimeout(() => {
              message.channel.send(`✅  Cleared **${amount}**/**${amount}** messages!`, {
                timeout: 4000,
                message
              });
            }, 3000);
          } else if (amount % 100 === 0) {
            message.channel.bulkDelete(amount, true).then(m => {
              message.channel.send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
                timeout: 4000,
                message
              });
            });
          } else {
            let s = await message.channel.bulkDelete(amount % 100, true);
            message.channel.send(`✅  Cleared **${s.size}**/**${amount}** messages!`, {
              timeout: 4000,
              message
            });
          }
        }
   }
 }  