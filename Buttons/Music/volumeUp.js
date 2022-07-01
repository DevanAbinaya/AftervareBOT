const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    id: "volumeUpMusic",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],

    async execute(interaction, client) {

        const {
            options,
            member,
            guild
        } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) return interaction.reply({
            content: "🔸 |  You aren't in a voice channel.",
            ephemeral: true
        });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({
            content: `🔸 |  Join <#${guild.me.voice.channelId}>. to use the music commands.`,
            ephemeral: true
        });



        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: member.voice.channel.id,
            textChannel: interaction.channelId,
            selfDeafen: true,
            volume: 50
        });

        if (!player.playing && !player.paused) return interaction.reply({
            content: "🔸 |  There is nothing in the queue.",
            ephemeral: true
        })

        if (!player.playing) return interaction.reply({
            content: "🔸 |  Resume the player before adjusting the volume.",
            ephemeral: true
        })

        const volume = player.volume + 10

        if (volume < 0 || volume > 100) return interaction.reply({
            content: `🔸 |  You can only set the volume from 0 to 100. The volume is currently **${player.volume}%**`
        })


        player.setVolume(volume);

        const volumeEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`🔹 |  Volume has been adjusted to **${player.volume}%** [${member}]`)
            .setTimestamp()


        await interaction.reply({
            embeds: [volumeEmbed]
        })
        await wait(2000)
        interaction.deleteReply()
    }
}