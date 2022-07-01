const {
    MessageEmbed
} = require("discord.js");
const util = require("../../utils/erelaUtil");

module.exports = {
    name: 'queue',
    ownerOnly: false,
    description: 'View the queue',
    userperm: [],
    botperm: [],
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {



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

        if (!player.queue.length) return interaction.reply({
            content: "🔸  |  There is nothing in the queue.",
            ephemeral: true
        });

        const queue = player.queue.map((t, i) => `\`${++i}.\` **${t.title}** [${t.requester}]`);
        const chunked = util.chunk(queue, 10).map(x => x.join("\n"));

        const queueEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`Current queue for ${guild.name}`)
            .setDescription(chunked[0])
            .setTimestamp()

        return interaction.reply({
            embeds: [queueEmbed]
        });

    }

}