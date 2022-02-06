const { Client, Message, MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");
const colors = require("../../assets/colors.json");
const ms = require('ms');

module.exports = {
  name: "anime",
  aliases: ["search-anime"],
  categories: 'fun',
  description: 'Search anime through discord!',
  usage: "<search>",
  required: true,
  cooldown: 5,

  run: async (client, message, args) => {
    try {
        const color = colors.aqua;

        const syntaxError = new MessageEmbed()
            .setTitle('Please provide the Anime title')
            .setDescription('> `-anime <title>`')
            .setFooter({text: "this embed will disappear after 10 seconds."})
            .setColor("RED")
            .setTimestamp()

      const query = args.join(" ");

      if (!query)
        return message.reply({
          embeds: [syntaxError],
          ephemeral: true
        }).then((msg) => {
            setTimeout(() => msg.delete(), ms('10 seconds'))
        });

      let option = {
        url: `https://kitsu.io/api/edge/anime?filter[text]-${query}`,
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

      const anime = res?.data[0];
      if (!anime)
        return message.reply({
          content: "No results were found!",
        });

      const animeSearch = {
        title: `${anime.attributes.titles.en_jp}`,
        url: `${anime.links.self}`,
        thumbnail: {
          url: anime.attributes.posterImage.original,
        },
        description: anime.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: anime.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: anime.attributes.showType,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
              anime.attributes.startDate && anime.attributes.endDate
                ? anime.attributes.startDate == anime.attributes.endDate
                  ? `**${anime.attributes.startDate}**`
                  : `From **${
                      anime.attributes.startDate
                        ? anime.attributes.startDate
                        : "N/A"
                    }** to **${
                      anime.attributes.endDate
                        ? anime.attributes.endDate
                        : "N/A"
                    }**`
                : `From **${
                    anime.attributes.startDate
                      ? anime.attributes.startDate
                      : "N/A"
                  }** to **${
                    anime.attributes.endDate ? anime.attributes.endDate : "N/A"
                  }**`,
            inline: false,
          },
          {
            name: "💽 Total Episodes",
            value: `${
              anime.attributes.episodeCount
                ? anime.attributes.episodeCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⏱ Duration",
            value: `${
              anime.attributes.episodeLength
                ? anime.attributes.episodeLength
                : "N/A"
            } Min`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
              anime.attributes.averageRating
                ? anime.attributes.averageRating
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
              anime.attributes.ratingRank
                ? "**TOP " + anime.attributes.ratingRank + "**"
                : "N/A"
            }`,
            inline: true,
          },
        ],
        color: color,
      };

      return message.channel.send({
        embeds: [animeSearch],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
