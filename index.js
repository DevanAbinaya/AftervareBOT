const { Discord, Client, Message, MessageEmbed, Collection } = require("discord.js");
const colors = require("colors");
const { DisTube } = require('distube');
require('dotenv').config();
var token = process.env.token;
const fs = require("fs");

// // Youtube Notification
const Parser = require("rss-parser");
const parser = new Parser();
const YoutubePoster = require("discord-yt-poster");

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

const config = require("./config/config.json");

const ee = require("./config/embed.json");
const prefix = config.prefix;

// Distube
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

// Global Variables
client.distube = new DisTube(client, {
  youtubeDL: false,
  leaveOnEmpty: true,
  emptyCooldown: 5,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
  },
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin()
  ]
});
client.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");
client.colors = require("./assets/colors.json");
client.emotes = config.emoji;
client.temp = new Collection();
client.YTP = new YoutubePoster(client);

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


client.login(token); 
