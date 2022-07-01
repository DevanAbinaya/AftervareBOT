const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'volume',
    ownerOnly: false,
    description: 'Adjust the volume.',
    userperm: [],
    botperm: [],
    options: [
        {
            name: "percent",
            description: "Provide a volume between 1-100.",
            type: 4,
            required: true,
        }
    ],
   
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


        const volume = options.getInteger("percent");

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
            content: "🔸 |  Resume the player to adjust the volume."
        })
        
        if (volume < 0 || volume > 100) return interaction.reply({ content: `🔸 |  You can only set the volume from 0 to 100.` })

        player.setVolume(volume);

        const volumeEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`🔹 |  Volume has been adjusted to **${player.volume}%** [${member}]`)
            .setTimestamp()
        return interaction.reply({ embeds: [volumeEmbed] })

    }

}