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
                  value: "`ara-ara`\n`arigato`\n`fuck-you`\n`niconiconii`\n`oni-chan`\n`senpai`\n`tutturu`"
                },
                {
                  name: 'EFFECTS',
                  value: '`bass-boost`\n`dicord-notification`\n`error`\n`fart`\n`roblox-death`\n`are-ya-winning-son`\n`villager`'
                },
                {
                  name: 'MEMES',
                  value: '`john-cena`\n`bruh`\n`directed-by`\n`enemy-spotted`\n`herewegoagain`\n`itwasthismoment`\n`noice`\n`rickroll`\n`super-idol`\n`virus`\n`x-file-theme-song`'
                }
            )
            .setFooter({ text: "If you can't find what you need, ask `Factiven#9110` for help." })
            .setTimestamp()
            .setColor('GREEN');
        return message.channel.send({ embeds: [embed] });
   }
 }
