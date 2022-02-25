const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const SoundBoard = require('../../assets/modules/djs-soundboard');

module.exports = {
    name: 'soundboard',
    description: 'Some of Soundboard sound',
    userperm: [],
    botperm: [],
    vc: true,
    options: [
        {
          name: 'sound',
          description: 'choose the mini-game',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'Fart',
              value: 'fart'
            },
            {
              name: 'Bruh',
              value: 'bruh'
            },
            {
              name: 'Roblox-death',
              value: 'roblox-death'
            },
            {
              name: 'Bass-boost',
              value: 'bass-boost'
            },
            {
              name: 'Error',
              value: 'error',
            },
            {
              name: 'Rickroll',
              value: 'rickroll'
            },
            {
              name: 'Villager',
              value: 'villager'
            },
            {
              name: 'Discord-notification',
              value: 'discord-notification'
            },
            {
              name: 'Ara-Ara',
              value: 'ara-ara'
            },
            {
              name: 'Super-Idol',
              value: 'super-idol'
            },
            {
              name: 'And-his-name-is-john-cena',
              value: 'and-his-name-is-john-cena-1'
            },
            {
              name: 'it-was-at-this-moment-that-he-he-knew-he-f-cked-up',
              value: 'it-was-at-this-moment-that-he-he-knew-he-f-cked-up'
            },
            {
              name: 'Noice',
              value: 'noice'
            },
            {
              name: 'Enemy-spotted',
              value: 'enemy-spotted'
            },
            {
              name: 'Directed-by',
              value: 'directed-by-robert-b_voI2Z4T'
            },
            {
              name: 'Shutdown',
              value: 'shutdown'
            },
            {
              name: 'Senpai',
              value: 'senpai'
            },
            {
              name: 'Oni-chan',
              value: 'oni-chan'
            },
            {
              name: 'Nico-nico-nii',
              value: 'niconiconii'
            },
            {
              name: 'F*ck-You',
              value: 'fuck-you'
            },
            {
              name: 'Arigato',
              value: 'arigato'
            },
            {
              name: 'Tutturuu',
              value: 'turuturu'
            },
            {
              name: 'X-file-theme-song',
              value: 'x-files-theme-song-copy'
            },
            {
              name: 'Ah-shit-here-we-go-again',
              value: 'herewegoagain'
            },
            {
              name: 'Virus',
              value: 'virus'
            },
          ]
        },
      ],
  
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const valueId = interaction.options.getString('sound');
        
        interaction.reply({content: `Playing **${valueId}**`, ephemeral: true});
        
        let sound = new SoundBoard
        let channel = interaction.member.voice.channel

        sound.play(channel, valueId)
    }
 }   
