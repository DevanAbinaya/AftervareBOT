const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    ownerOnly: false,
    description: 'Play a song',
    userperm: [],
    botperm: [],
    options: [
        {
            name: "query",
            description: "Provide the name of the song or URL.",
            type: 3,
            requred: true
        }
    ],
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        function msToTime(duration) {
            var milliseconds = Math.floor((duration % 1000) / 100),
                seconds = Math.floor((duration / 1000) % 60),
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            
            return minutes + ":" + seconds;
            }
              
            const { options, member, guild } = interaction;
            
            const VoiceChannel = member.voice.channel;
    
            if (!VoiceChannel) return interaction.reply({ content: "🔸 |  You aren't in a voice channel. Join one to be able to play music! Already in a voice channel? Make sure I have permission to see it.", ephemeral: true });
    
            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({ content: `🔸 |  I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true });
    
            if(!VoiceChannel.joinable) return interaction.reply({ content: "🔸 |  I do not have permission to join your voice channel.", ephemeral: true})
    
            const player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: member.voice.channel.id,
                textChannel: interaction.channelId,
                selfDeafen: true,
                volume: 50
            });
    
            let res;
    
            const query = interaction.options.getString("query");
    
            res = await player.search(query, interaction.user);
    
            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) player.destroy();
                return interaction.reply({ content: "🔸 |  An error has occured while trying to add this song.", ephemeral: true })
            }
    
            if (res.loadType === "NO_MATCHES") {
                if (!player.queue.current) player.destroy();
                return interaction.reply({ content: "🔸 |  No results found.", ephemeral: true })
            }
    
            if (res.loadType === "PLAYLIST_LOADED") {
                if (player.state !== 'CONNECTED') player.connect()
                player.queue.add(res.tracks);
                player.pause(false)
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                const playlistEmbed = new MessageEmbed()
                    .setDescription(`🔹 |  **[${res.playlist.name}](${query})** [${member}]has been added to the queue.`)
                    .addField("Enqueued", `\`${res.tracks.length}\` tracks`)
                    .setTimestamp()
                    .setColor("BLURPLE")
                return interaction.reply({ embeds: [playlistEmbed] })
            }
    
            if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
                if (player.state !== 'CONNECTED') player.connect()
                player.queue.add(res.tracks[0]);
                player.pause(false)
            }
    
            const enqueueEmbed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`🔹 |  Enqueued **[${res.tracks[0].title}](${res.tracks[0].uri})** [${msToTime(res.tracks[0].duration) || "Undetermined"} - ${member}]`)
                .setTimestamp()
            await interaction.reply({ embeds: [enqueueEmbed] });
    
            if (!player.playing && !player.paused && !player.queue.size) player.play()
    
            if (player.queue.totalSize > 1)
                enqueueEmbed.addField("Position in queue", `${player.queue.size - 0}`);
            return interaction.editReply({ embeds: [enqueueEmbed] })
    
    }
}
