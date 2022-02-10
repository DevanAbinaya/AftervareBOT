const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const client = require("../../index");

// Prefix
const prefixSchema = require('../../models/prefix');
const prefix = require('../../config/config.json').prefix;
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

module.exports = {
    name: 'list',
    aliases: ['cmdlist', 'listcmd'], 
    categories: 'info', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Show all of normal commands that available',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
        if (!args[0]) {
            let categories = [];

            const p = await client.prefix(message)
      
            readdirSync("./commands").forEach((dir) => {
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                file.endsWith(".js")
              );
      
              const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);
      
                if (!file.name) return "No command name.";
      
                let name = file.name.replace(".js", "");
      
                return `\`${name}\``;
              });
      
              let data = new Object();
      
              data = {
                name: dir.toUpperCase(),
                value: cmds.length === 0 ? "In progress." : cmds.join(" "),
              };
      
              categories.push(data);
            });

              const embed = new MessageEmbed()
              .setTitle("📬 Need help? Here are all of my Normal commands:")
              .addFields(categories)
              .setDescription(
                `Use \`\`${p}help\`\` followed by a command name to get more additional information on a command. For example: \`${p}help invite\`.`
              )
              .setFooter({ text: "If you can't find what you need, ask `Factiven#9110` for help." })
              .setTimestamp()
              .setColor('GREEN');
            return message.channel.send({ embeds: [embed] });
        }
   }
 }  