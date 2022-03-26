const { Client, MessageEmbed } = require("discord.js");
const cron = require('node-cron');
const client = require('../../index');

 // Channel ID (Optional)

client.on("ready", () => {
    const channel = client.channels.cache.get('927563716403269642')

    // const embed = new MessageEmbed()
    // .setColor("GREEN")
    // .setTitle("Morning!!")
    // .setDescription("@everyone Good Morning Y'All!")
    // .setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
    // .setTimestamp();

    cron.schedule('00 07 * * *', () => {
        channel.send(`Good Morning @everyone !!`).then((m) => {
          m.react("<:goodmorning:957176648896217088>")
          console.log("Scheduled event has been activated.")
        })
       }, {
         scheduled: true,
         timezone: "Asia/Jakarta"
       });

    });