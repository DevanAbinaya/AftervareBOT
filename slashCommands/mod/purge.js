const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'clear the message',
    userperm: [],
    botperm: [],
    ownerOnly: false,
    options: [
      {
        name: "number",
        description: "Please enter a number of messages to purge",
        type: "NUMBER",
        required: true,
      }
  ],
  
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let amount = interaction.options.getNumber('number');
        if (!amount || amount < 2) {
            return interaction.reply({text:"Please enter a number of message between 2", ephemeral: true});
        }
        if (amount <= amount + 200) {
            if (Math.floor(amount / 100) % 100 === 0) {
              interaction.channel.bulkDelete(amount, true).then(m => {
                interaction.channel.send({content: `✅  Cleared **${m.size}**/**${amount}** messages!`}).then((msg) => {
                  setTimeout(() => msg.delete(), ms('5 seconds'))
              });
              });
            } else if (Math.floor(amount / 100) % 100) {
              setTimeout(() => {
                for (let i = 0; i < Math.floor(amount / 100) % 100; i++) {
                  interaction.channel.bulkDelete(100, true);
                }
              }, 1000);
              setTimeout(() => {
                interaction.channel.send(`✅  Cleared **${amount}**/**${amount}** messages!`, {
                  timeout: 4000,
                  message
                }).then((msg) => {
                  setTimeout(() => msg.delete(), ms('5 seconds'))
              });
              }, 3000);
            } else if (amount % 100 === 0) {
              interaction.channel.bulkDelete(amount, true).then(m => {
                interaction.channel.send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
                  timeout: 4000,
                  message
                }).then((msg) => {
                  setTimeout(() => msg.delete(), ms('5 seconds'))
              });
              });
            } else {
              let s = await interaction.channel.bulkDelete(amount % 100, true);
              interaction.channel.send(`✅  Cleared **${s.size}**/**${amount}** messages!`, {
                timeout: 4000,
                message
              }).then((msg) => {
                setTimeout(() => msg.delete(), ms('5 seconds'))
            });
            }
          }

    }
 }