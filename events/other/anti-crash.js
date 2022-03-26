let { MessageEmbed } = require("discord.js")
let client = require("../../index")

 process.on("unhandledRejection", (reason, promise) => {
 
     const channel = client.channels.cache.get("936231208659087371")
 
     const embed = new MessageEmbed()
         .setAuthor({ name: 'Anti Crash', iconURL: 'https://cdn.discordapp.com/attachments/900382186354671696/929420685015658516/fran-madaraki.png'})
         .setTitle(`Unhandled Rejection`)
         .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
         .addField("Promise", `\`\`\`${promise}\`\`\``, true)
         .addField("Reason", `\`\`\`${reason}\`\`\``, true)
         .setTimestamp()
         .setFooter({text: "Imagine a bot without anti-crash"})
         .setColor(`#b20000`)
 
         return channel.send({ embeds: [embed]})
 
 });
 
 
 process.on("uncaughtException", (err, origin) => {
 
     const channel = client.channels.cache.get("936231208659087371")
 
     const embed = new MessageEmbed()
     .setAuthor({ name: 'Anti Crash', iconURL: 'https://cdn.discordapp.com/attachments/900382186354671696/929420685015658516/fran-madaraki.png'})
     .setTitle(`Uncaught Exception`)
     .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
     .addField("Origin", `\`\`\`${origin}\`\`\``, true)
     .addField("Error", `\`\`\`${err}\`\`\``, true)
     .setTimestamp()
     .setFooter({text: "Imagine a bot without anti-crash"})
     .setColor(`#b20000`)
 
     return channel.send({ embeds: [embed]})
 
 });
 
 
 process.on("uncaughtExceptionMonitor", (err, origin) => {
 
     const channel = client.channels.cache.get("936231208659087371")
 
     const embed = new MessageEmbed()
     .setAuthor({ name: 'Anti Crash', iconURL: 'https://cdn.discordapp.com/attachments/900382186354671696/929420685015658516/fran-madaraki.png'})
     .setTitle(`Uncaught Exception Monitor`)
     .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
     .addField("Origin", `\`\`\`${origin}\`\`\``, true)
     .addField("Error", `\`\`\`${err}\`\`\``, true)
     .setTimestamp()
     .setFooter({text: "Imagine a bot without anti-crash"})
     .setColor(`#b20000`)
 
     return channel.send({ embeds: [embed]})
 
 });

// process.on("multipleResolves", (type, promise, reason) => {
// 
//     const channel = client.channels.cache.get("936231208659087371")
// 
//     const embed = new MessageEmbed()
//     .setAuthor({ name: 'Anti Crash', iconURL: 'https://cdn.discordapp.com/attachments/900382186354671696/929420685015658516/fran-madaraki.png'})
//     .setTitle(`Multiple Resolves`)
//     .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
//     .addField("Type", `\`\`\`${type}\`\`\``, false)
//     .addField("Promise", `\`\`\`${promise}\`\`\``, true)
//     .addField("Reason", `\`\`\`${reason}\`\`\``, true)
//     .setTimestamp()
//     .setFooter({text: "Imagine a bot without anti-crash"})
//     .setColor(`#b20000`)
// 
//     return channel.send({ embeds: [embed]})
// 
// });