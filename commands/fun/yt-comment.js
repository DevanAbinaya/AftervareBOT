const { Client, Message, MessageEmbed } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
    name: 'comment',
    aliases: ['ytc'], 
    categories: 'fun', 
    userperm: ['ATTATCH_FILES'],
    botperm: ['ATTATCH_FILES'],
    ownerOnly: false,
    description: 'For youtube command',
    cooldown: 5,
    usage: '<text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        const comment = args.join("");
        if (!comment)
          return client.send(
            `${await client.emoji("DGH_error")} Provide something to Comment!`,
            {message}
          );
        let yt = await canvacord.Canvas.youtube({
          avatar: message.author.displayAvatarURL({ format: "png" }),
          username: message.author.username,
          content: args.join(" ")
        });
        message.channel.send({ files: [{ attachment: yt, name: "comment.png" }] });
   }
 }  