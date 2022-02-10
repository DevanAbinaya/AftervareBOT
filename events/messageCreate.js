const { MessageEmbed, Collection } = require("discord.js");
var config = require("../config/config.json");
var ee = require("../config/config.json");
const client = require("..");
const ms = require('ms');
const colors = require('../assets/colors.json')

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Custom Prefix
const prefixSchema = require('../models/prefix');
const prefix = require('../config/config.json').prefix

client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild : message.guild.id })
      .catch(err => console.log(err))
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = prefix;
  }
  return custom;
};

client.on("messageCreate", async (message) => {
  const prefix = await client.prefix(message)

  const { escapeRegex, onCoolDown } = require("../utils/function");
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  // getting mention prefix
  if (cmd.length === 0) {
    if (matchedPrefix.includes(client.user.id)) {
      const mention = new MessageEmbed()
      .setDescription(`*To see all Commands* \ntype: \`${prefix}help\``)
      .setFooter({text: "AftervareBOTs"})
      message.reply({
        embeds: [mention],
        allowedMentions: {
         repliedUser: false
     }
     });
    }
  }
  
///starting commands & aliases
  const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  if (command) {
    let userperm = new MessageEmbed().setDescription(
      `*<a:No_1:939189505804607509> You Need **${command.userperm}** Permission*`
    );

    if (!command) return
    if (command.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    }

    if (!message.member.permissions.has(command.userperm || []))
      return message.channel.send({ embeds: [userperm] });

     
     
    //Check if user is on cooldown with the cmd
    if (onCoolDown(message, command)) {
      let cool = new MessageEmbed()
      .setDescription(`*<a:No_1:939189505804607509> Please wait **${onCoolDown(message, command)}** Second(s) before reusing this ${command.name} command!*`)
      const del = await message.channel.send({embeds : [cool]})
      client.sleep(3000).then(() => del.delete());
    }

    let botperm = new MessageEmbed().setDescription(
      `*<a:No_1:939189505804607509> I Need **${command.botperm}** Permission*`
    );
    if (!message.guild.me.permissions.has(command.botperm || []))
    return message.channel.send({ embeds: [botperm] });

    /// owner only command handler
    const { owners } = require("../config/config.json");
    if (command) {
    if (command.ownerOnly) {
    if (!owners.includes(message.author.id)) {
    let ownerOnly = new MessageEmbed()
      .setDescription( "*<a:No_1:939189505804607509> Only Bot Developer can use this command!*" )
    return message.channel.send({ embeds: [ownerOnly]})
    }}
  }

    // Maintenance handler
    if (command.maintenance) {
      if (!owners.includes(message.author.id)) {
          const down = {
            title: '<:error:939189126786318336> Oops my bad',
            description: "I'm really sorry that currently this command is in maintenance.\n> Please wait in patience until we fix this!",
            color: colors.red,
            timestamp: new Date(),
          };
          return message.reply({
              embeds: [down],
          });
      }
  }

 if (command) command.run(client, message, args, prefix);

}

}); // new start from here

client.on("messageCreate", async(message) => {
  if(message.content.toLowerCase() == "-hen") {
    message.delete(1000);
      message.member.roles.add('900662797698990080');
        
        const henEmbed = new MessageEmbed()
          .setAuthor({name: 'AftervareBOT'})
          .setDescription(`Good job you unlocked the <#934847781724635196> ( ͡° ͜ʖ ͡°)`)
          .setColor('NOT_QUITE_BLACK')
          .setFooter({text: "*This message will disappeared after 50 seconds"})

        message.channel.send({ embeds: [henEmbed] }).then((msg) => {
          setTimeout(() => msg.delete(), ms('50 seconds'))
      })
        sleep(3600000).then(() => { message.member.roles.remove('900662797698990080');
        message.author.send(`<@${message.author.id}> Udah sejam nih, segitu dulu aja ya scientific researchnya :v`).then((msg) => {
          setTimeout(() => msg.delete(), ms('50 seconds'))
      });
     });
  }
});

client.on("messageCreate", async (message) => {
  const p = await client.prefix(message)

    if(message.content.toLowerCase() == "speed") {
          message.channel.send('https://imgur.com/2DbH3W6').then((msg) => {
            setTimeout(() => msg.delete(), ms('10 seconds'))
        });

      } else if(message.content.toLowerCase() == "troleo divino") {
          message.channel.send('https://i.pinimg.com/736x/c5/3d/47/c53d47cec202c0750d19f80ad671ea7e.jpg').then((msg) => {
            setTimeout(() => msg.delete(), ms('10 seconds'))
        });

      } else if(message.content.toLowerCase().includes("amogus")) {
          message.channel.send('https://imgur.com/rkzfboM').then((msg) => {
            setTimeout(() => msg.delete(), ms('10 seconds'))
        });

      } else if(message.content.toLowerCase() == "troleo") {
        message.channel.send('https://cdn.discordapp.com/attachments/697798117772492861/929381393786626058/troleo.jpg').then((msg) => {
          setTimeout(() => msg.delete(), ms('10 seconds'))
      });

      } else if(message.content.toLowerCase() == "divino") {
        message.channel.send('https://cdn.discordapp.com/attachments/697798117772492861/929381354318233620/divino.jpg').then((msg) => {
          setTimeout(() => msg.delete(), ms('10 seconds'))
      });

      } else if(message.content.toLowerCase() == "dog") {
        message.channel.send('https://imgur.com/tesrTEk').then((msg) => {
          setTimeout(() => msg.delete(), ms('10 seconds'))
      });

      } else if(message.content.toLowerCase() == "cat") {
        message.channel.send('https://imgur.com/IYL2rY7').then((msg) => {
          setTimeout(() => msg.delete(), ms('10 seconds'))
      });

      } else if(message.content.toLowerCase() == "bruh") {
        message.channel.send('https://imgur.com/N5otWu6').then((msg) => {
          setTimeout(() => msg.delete(), ms('10 seconds'))
      });

      } else if(message.content.toLowerCase() === "-prefix") {
        message.channel.send(`Prefix in **${message.guild.name}** is **${p}**`)
      }
});
