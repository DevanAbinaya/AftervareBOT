const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stop',
    ownerOnly: false,
    description: 'Stop the music.',
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

        player.destroy()

        const disconnectEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`🔹 |  Disconnected [${member}]`)
            .setTimestamp()
        return interaction.reply({ embeds: [disconnectEmbed] })

    }

}