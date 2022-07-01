const { Discord, Client, MessageActionRow, MessageEmbed, Collection, MessageButton } = require("discord.js");
const colors = require("colors");
require('dotenv').config();
var token = process.env.token;
const fs = require("fs");
const SpotifyClientID = process.env.SPOTIFYID;
const SpotifySecret = process.env.SPOTIFYSECRET;
const DB_COUNTER = require("./src/models/songsPlayed");

// // MUSIC WITH LAVALINK // //

const { nodes } = require("./src/config/config.json");
const Spotify = require("better-erela.js-spotify").default;
const Apple = require("better-erela.js-apple").default;
const {
  Manager
} = require("erela.js");

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

// // Youtube Notification
const Parser = require("rss-parser");
const parser = new Parser();


// Creating Client //
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
module.exports = client;

const config = require("./src/config/config.json");

const ee = require("./src/config/embed.json");
const prefix = config.prefix;

client.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
client.commands = new Collection();
client.aliases = new Collection();
client.buttons = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");
client.colors = require("./src/assets/colors.json");
client.emotes = config.emoji;
client.temp = new Collection();
client.nowPlaying = new Collection();
client.djConfig = new Collection();

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

/**
 * Format a date to a readable string
 * @param {Date} date The date to format 
 */
 function formatDate(date) {
  let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
  return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
}

// Erela Config

client.manager = new Manager({
  nodes,
  plugins: [
      new Spotify({
          clientID: SpotifyClientID,
          clientSecret: SpotifySecret,
      }),
      new Apple(),
  ],
  send: (id, payload) => {
      let guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
  },
});

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('volumeDownMusic') //DONE
        .setStyle('DANGER')
        .setEmoji('🔉'),
        new MessageButton()
        .setCustomId('volumeUpMusic') //DONE
        .setStyle('SUCCESS')
        .setEmoji('🔊'),
        new MessageButton()
        .setCustomId('skipMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏩'),
        new MessageButton()
        .setCustomId('pauseMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏸️'),
        new MessageButton()
        .setCustomId('resumeMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏯️')
    )


client.manager
    .on("nodeConnect", (node) => {
        console.log(`[Erela] >> Connection has been established to "${node.options.identifier}".`)
    })

    .on("nodeDisconnect", (node, error) => {
        console.log(`[Erela] >> Lost connection to "${node.options.identifier}" due to an error: ${error.message}.`)
    })

    .on("nodeError", (node, error) => {
        console.log(`[Erela] >> Node "${node.options.identifier}" has encountered an error: ${error.message}.`)
    })

    .on("trackEnd", async (player, track) => {


        messageID = client.nowPlaying.get(player.guild); //Fetch message id from collection with key as player.guild (aka guildID)

        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(messageID) //Fetch channel then the message

        if (fetchedMessage.deletable) await fetchedMessage.delete() //Check if deleteable then delete message


        //DB fetch and update counter

        const dbFoundCounter = await DB_COUNTER.findOne({
            ident: "counter"
        });
        if (dbFoundCounter) await dbFoundCounter.updateOne({
            songsPlayed: dbFoundCounter.songsPlayed + 1
        });

    })

    .on("trackStart", async (player, track) => {

        const playerChannel = client.channels.cache.get(player.textChannel)
        if (!playerChannel.permissionsFor(playerChannel.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES",])) return;
        
        message = await client.channels.cache.get(player.textChannel).send({
            embeds: [new MessageEmbed().setColor("BLURPLE").setDescription(`🔹 |  Now Playing **[${track.title}](${track.uri})** [${msToTime(track.duration) || "Undetermined"} - <@${track.requester.id}>]`).setImage(track.displayThumbnail("maxresdefault")).setTimestamp()]
        })

        client.nowPlaying.set(player.guild, message.id); //Set nowplaying collection

    })

    .on("queueEnd", async (player, track) => {

        player.destroy()
        player.disconnect()

        client.nowPlaying.delete(player.guild); //Set nowplaying collection

        messageID = client.nowPlaying.get(player.guild); //Fetch message id from collection with key as player.guild (aka guildID)


        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(messageID) //Fetch channel then the message
        
        if (fetchedMessage.deletable) await fetchedMessage.delete() //Check if deleteable then delete message
        
        client.nowPlaying.delete(player.guild); //Set nowplaying collection

        const playerChannel = client.channels.cache.get(player.textChannel)
        if (!playerChannel.permissionsFor(playerChannel.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES",])) return;

        const leaveEmbed = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(`🔹 |  Queue Ended - [Thanks for using Rivera Music!]`)
        .setTimestamp()

        await playerChannel.send({ embeds: [leaveEmbed] });

    })

  client.on("raw", (d) => client.manager.updateVoiceState(d));


(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleButtons();
})


client.login(token); 
