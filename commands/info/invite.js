const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'invite',
    aliases: ['i'], 
    categories: 'info', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Give bot invitation',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 
      
      const inviteEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setTitle("Invite & Support Link!")
      .addField("**Invite Link**", `[Click here to invite me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
      .addField("**Support Server**", `[Click to join support Server](https://discord.gg/UFjyySQSgc)`)
      .setFooter({text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
      .setTimestamp()
      
      message.channel.send({ embeds: [inviteEmbed] })
    
   }  
 } 
 
// const inviteEmbed = new MessageEmbed()
// .setColor('GREEN')
// .setTitle('Invite Me!')
// .setAuthor({ name: "AftervareBOT", iconURL: 'https://cdn.discordapp.com/attachments/900382186354671696/929420685015658516/fran-madaraki.png'})
// .setDescription(`[CLICK ME](https://discord.com/api/oauth2/authorize?client_id=927193694937952276&permissions=8&scope=applications.commands%20bot) to invite me to your server!`)
// .setTimestamp()
// 
// message.channel.send({ embeds: [inviteEmbed] })