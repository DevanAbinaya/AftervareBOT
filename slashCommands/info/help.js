const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
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
    name: "help",
    description: "Show All Commands",
    ownerOnly: false,
    userperm: [],
    botperm: [],

  /**
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await interaction.deferReply();
    const roleColor =
    interaction.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : interaction.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      const p = await client.prefix(interaction)

      readdirSync("./slashCommands").forEach((dir) => {
        const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../slashCommands/${dir}/${command}`);

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
        .setTitle("📬 Need help? Here are all of my Slash commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${p}help\` followed by a command name to get more additional information on a command. For example: \`${p}help invite\`.`
        )
        .setFooter({ text:
          `Requested by ${interaction.user.tag}`,
        })
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({ embeds: [embed] });
    } else {
      const p = await client.prefix(interaction)
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${p}help\` for all of my commands!`
          )
          .setColor("FF0000");
        return interaction.followUp({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${p}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${p}${command.name} ${command.usage}\``
            : `\`${p}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter({ text:
            `Requested by ${interaction.user.tag}`,
        })
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({ embeds: [embed] });
    }
  },
};
