const client = require("../../index");
const mongoose = require("mongoose");
const chalk = require("chalk");
require('dotenv').config();
var mongoUrl = process.env.MONGOLAB_URI;

client.on("ready", () => {
/// Channel log
const channel = client.channels.cache.get("927563716403269642")

/// connecting mongo db
    mongoose
    .connect(mongoUrl, {
        useUnifiedTopology : true,
        useNewUrlParser : true,
    }).then(
        console.log(
          chalk.bgGreenBright.black(
            ` ${client.user.username} connected to Mongo DB `
          )
        )
      )
      .catch((err) =>
        console.log(
          chalk.bgRedBright.black(
            ` ${client.user.username} could not connect to mongo DB `
          )
        )
      );
      let allMembers = new Set();
      client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach((member) => {
          allMembers.add(member.user.id);
        });
      });
    
      let allChannels = new Set();
      client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
          allChannels.add(channel.id);
        });
      });
    
      console.log(
        chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
        chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
        chalk.bgMagentaBright.black(` ${allMembers.size} members `)
      );
      
/// loading bot
console.log(`${client.user.tag} is Online!`)
// channel.send(`**${client.user.tag} is Ready to Go!**`)
const arrayOfStatus = [
  `-help | -prefix`
];

let index = 0;
setInterval(() => {
  if(index === arrayOfStatus.length) index = 0;
  const status = arrayOfStatus[index];
  client.user.setActivity(status, { type: "PLAYING" })
  index++;
}, 7000)

client.manager.init(client.user.id);
});
