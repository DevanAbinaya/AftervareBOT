const { Client, Message, MessageEmbed } = require("discord.js")
const { emojis } = require("../..")

module.exports = {
 name: "serverinfo",
 categories: 'info',
 userperm: [],
 botperm: [],
 ownerOnly: false,
 description: "server information",
 aliases: ["SERVERINFO","serverinformation", "SERVERINFORMATION"],
 cooldown: 5,

 /**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */
 run: async(client, message, args) => {

 
 const embed = new MessageEmbed()
 .setAuthor(message.guild.name, message.guild.iconURL())
 .setColor("PURPLE")
 .setFooter(`Serverinfo of ${message.guild.name}`, message.guild.iconURL())
 .setThumbnail(message.guild.iconURL())
 .addFields(
 {
 name: "🌍 | General",
 value: 
 `
 - **Name**: ${message.guild.name}
 - **Owner**: <@${message.guild.ownerId}>
 - **Created**: <t:${parseInt(message.guild.createdTimestamp / 1000)}:R>

 - **Description**: ${message.guild.description}

 `
 },
 {
 name: "👥 | Users",
 value: 
 `
 - **Members**: ${message.guild.members.cache.filter((m) => !m.user.bot).size}
 - **Bots**: ${message.guild.members.cache.filter((m) => m.user.bot).size}
 
 - **Total**: ${message.guild.memberCount}
 `
 },
 {
 name: "📜 | Channels",
 value:
 `
 - **Text**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
 - **Voice**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
 - **Threads**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "PUILD_PUBLIC_THREAD").size}
 - **Categories**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
 - **Stages**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}

 - **Total**: ${message.guild.channels.cache.size}
 `
 },
 {
 name: "😁 | Emojis & Stickers",
 value: 
 `
 - **Animated**: ${message.guild.emojis.cache.filter((e) => e.animated).size}
 - **Normal**: ${message.guild.emojis.cache.filter((e) => !e.animated).size}
 - **Stickers**: ${message.guild.stickers.cache.size}

 - **Total**: ${message.guild.stickers.cache.size + message.guild.emojis.cache.size}
 
 `
 },
 {
 name: "🥳 | Boost Information",
 value: 
 `
 - **Tier**: ${message.guild.premiumTier.replace("TIER_", "")}
 - **Boosts**: ${message.guild.premiumSubscriptionCount}
 - **Boosters**: ${message.guild.members.cache.filter((m) => m.premiumSince).size}
 `
 }
 )
 message.channel.send({ embeds: [embed] })
 }
 
}