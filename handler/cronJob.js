const {
    MessageEmbed
} = require("discord.js");
const DB_COUNTER = require("../src/models/songsPlayed");

module.exports = async (client) => {

    CronJob = require('cron').CronJob;
    var job = new CronJob("0 0 * * *", async () => {

        const DBFoundCounter = await DB_COUNTER.findOne({
            ident: "counter"
        });

        if (DBFoundCounter) await DBFoundCounter.updateOne({
            songsPlayed: 0
        });

        client.channels.cache.get('938384799041749002').send({
            embeds: [new MessageEmbed().setColor("GREEN").setDescription(`Successfully reset song counter.`)]
        })

    })
}