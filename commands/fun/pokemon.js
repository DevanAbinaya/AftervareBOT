const { Message, Client, MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");
const config = require("../../config/config.json");
const colors = require("../../assets/colors.json");
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
  name: "pokemon",
  aliases: ["search-pokemon"],
  usages: "<prefix>pokemon <search>",
  required: true,

  run: async (client, message, args) => {
    try {
      const Prefix = await client.prefix(message)
      const customPrefix = async (message) => {
        const data = await Prefix.findOne({ guildId: message.guild.id });
        if (data?.prefix) return data.prefix;
        return config.prefix;
      };
      const prefix = await customPrefix(message);

      const color = colors.aliceblue;
      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}pokemon <search>`,
          },
        ],
        color: colors.red,
      };

      if (!args[0])
        return message.reply({
          embeds: [syntaxError],
        });
      const pokemon = args[0].toLowerCase();

      const option = {
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        method: "GET",
        headers: {
          "Content-type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        json: true,
      };

      const res = await get(option).catch(() => {
        return message.reply({
          content: "No results were found!",
        });
      });

      if (!res)
        return message.reply({
          content: "No results were found!",
        });

      const { sprites, stats, weight, height, name, types } = res;
      let typesArray = [];
      types.forEach((type) => typesArray.push(`${type.type.name}`));

      const pokemonSearch = {
        title: `${
          name.charAt(0).toUpperCase(name.charAt(0)) +
          (name.length > 0 ? name.slice(1).toLowerCase() : "")
        }`,
        fields: [
          {
            name: "⚖ Weight",
            value: `${weight ? weight : "N/A"}`,
            inline: true,
          },
          {
            name: "📐 Height",
            value: `${height ? height : "N/A"}`,
            inline: true,
          },
        ],
        thumbnail: {
          url: sprites.front_default ? `${sprites.front_default}` : null,
        },
        color: color,
      };
      let typesField = {
        name: "🗂 Types",
        inline: false,
      };

      if (typesArray.length > 0) {
        if (typesArray.length > 1) {
          typesField.value = `${
            typesArray[0].charAt(0).toUpperCase() +
            typesArray[0].slice(1).toLowerCase() +
            ", " +
            typesArray.slice(1).join(", ")
          }`;
        } else {
          typesField.value = `${
            typesArray[0].charAt(0).toUpperCase() +
            typesArray[0].slice(1).toLowerCase()
          }`;
        }
        pokemonSearch.fields.push(typesField);
      }

      stats.forEach((stat) =>
        pokemonSearch.fields.push({
          name: `${
            stat.stat.name.charAt(0).toUpperCase() +
            stat.stat.name.slice(1).toLowerCase()
          }`,
          value: `${stat.base_stat ? stat.base_stat : "N/A"}`,
          inline: true,
        })
      );

      return message.channel.send({
        embeds: [pokemonSearch],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
