const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'soundboard',
    aliases: ['sb'], 
    categories: 'fun', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Moved to slash commands!',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.delete(); 
        const embed = new MessageEmbed()
            .setTitle("Soundboard command has been moved to /slash commands!")
            .setDescription("Use `/soundboard` on your chat instead of prefix\nIf you looking for the soundboard list, there you go: ")
            .addFields(
                {
                  name: 'ANIME',
                  value: "`ara-ara` `arigato` `fuck-you` `niconiconii` `oni-chan` `senpai` `tutturu`"
                },
                {
                  name: 'EFFECTS',
                  value: '`bass-boost` `dicord-notification` `error` `fart` `roblox-death` `shutdown` `villager`'
                },
                {
                  name: 'MEMES',
                  value: '`john-cena` `bruh` `directed-by` `enemy-spotted` `herewegoagain` `itwasthismoment` `noice` `rickroll` `super-idol` `virus` `x-file-theme-song`'
                }
            )
            .setFooter({ text: "If you can't find what you need, ask `Factiven#9110` for help." })
            .setTimestamp()
            .setColor('GREEN');
        return message.channel.send({ embeds: [embed] });
   }
 }
