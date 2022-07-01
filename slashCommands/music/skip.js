const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'skip',
    ownerOnly: false,
    description: 'Skip the current song.',
    userperm: [],
    botperm: [],
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const { options, member, guild } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) return interaction.reply({ content: "🔸 |  You aren't in a voice channel.", ephemeral: true });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({ content: `🔸 |  Join <#${guild.me.voice.channelId}>. to use the music commands.`, ephemeral: true });

        
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

        if (!player.playing) return interaction.reply({ content: "🔸 |  Resume the player before skipping this song.", ephemeral: true })

        await player.stop();

        const skipEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`🔹 |  Skipped [${member}]`)
            .setTimestamp()

        return interaction.reply({ embeds: [skipEmbed] });

    }

}