const fetch = require("node-fetch")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'lyrics',
    description: 'Lyrics of a song',
    categories: 'music',
    cooldown: 5,
    usage: '<song title>',
     /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async(client, message, args) => {
        try{
        const song = args.join(' ')
        if (!song) return message.channel.send("Please provide a song to search for!")
        const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json())
        if (json.error) return message.channel.send("Song not found!")
        const url = `${song.replace(" ", "+")}`
        let lyrics = json.lyrics;
        if (lyrics.length > 4096) lyrics = `Too long to show, visit [https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url}) For full lyrics`
        const embed = new MessageEmbed()
            .setTitle(json.full_title === "none" ? json.title : json.full_title)
            .setURL(json.url)
            .setThumbnail(json.image)
            .addField("Artist", json.artist)
            .setDescription("Lyrics:\n\n" + lyrics)
            .setColor("ffc0cb")
            .setFooter({text: "Lmfao ask the developer of the bot to change the code, copy paste won't work"})
        message.channel.send({embeds: [embed]})
        }catch(e) {
            return console.log(e)
        }
    }
}