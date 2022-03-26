const colors = require("../../src/assets/colors.json");
const client = require("../../index");
const { MessageEmbed } = require('discord.js');

const status = queue =>
  `\`Volume: ${queue.volume}% | Filter: ${queue.filters.join(', ') || 'Off'} | Loop: ${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  } | Autoplay: ${queue.autoplay ? 'On' : 'Off'}\``
client.distube
.on('playSong', (queue, song) => {
  const yes = {
    author: {
      name: '🎵 | PLAYING A SONG',
    },
    thumbnail: {
      url: `${song.thumbnail}`,
    },
    fields: [
      {
        name: "Now Playing",
        value: `${client.emotes.play} | Playing [${song.name}](${song.url}) - \`${song.formattedDuration}\`\nRequested by: ${
          song.user
        }\n${status(queue)}`
      },
    ],
    color: colors.invis,
  };
  queue.textChannel.send({
    embeds: [yes],
  });
})
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on('addList', (queue, playlist) => {
    const listadd = {
      fields: [
        {
          name: '',
          value: `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
            playlist.songs.length
          } songs) to queue\n${status(queue)}`
        },
      ],
      color: colors.invis,
    };
    queue.textChannel.send({
      embeds: [listadd]
    });
  })
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED").setDescription("🏃‍♀️ Voice channel is empty! Leaving the channel.")]}))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Finished!'))