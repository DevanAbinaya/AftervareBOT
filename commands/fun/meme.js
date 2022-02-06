const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const ee = require("../../config/embed.json");

module.exports = {
  name: "meme",
  description: "See Meme",
  categories: "fun",
  aliases: ["mem", "m"],
  userperm: ['SEND_MESSAGES'],
  botperm: [],
  ownerOnly: false,
  cooldown : 1,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const res = await fetch(`https://meme-api.herokuapp.com/gimme`);

    const json = await res.json();

    const Embed = new MessageEmbed()
      .setColor(ee.embed_color)
      .setURL(json.postLink)
      .setTitle(json.title)
      .setImage(json.url)
      .setFooter({text: `👍 ${json.ups || 0} | Author ${json.author || " "}`})
      .setTimestamp();

    return message.channel.send({ embeds: [Embed] });
  },
};