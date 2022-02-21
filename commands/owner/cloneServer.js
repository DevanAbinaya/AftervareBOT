const { MessageEmbed, Formatters } = require("discord.js")

module.exports = {
    name: 'guild-clone',
    aliases: ['cloneserver', 'serverclone', 'clone'], 
    categories: 'owner', 
    userperm: ['ADMINISTRATOR'],
    botperm: ['ADMINISTRATOR'],
    ownerOnly: true,
    description: 'Clone the server!',
    cooldown: 5,
    usage: '',
  run: async (client, message, args) => {
    const guild = message.guild;
    try {
      (await guild.createTemplate(guild.name)).sync().then((t) => {
        const createTemplate = new MessageEmbed()
          .setTitle("SERVER TEMPLATE")
          .addField("URL", Formatters.codeBlock("fix", `${t.url}`))
          .addField("Code", Formatters.codeBlock("fix", `${t.code}`))
          .setColor("RANDOM")
        return message.reply({ embeds: [createTemplate] })
      })
    } catch (error) {
      const templateCreated = new MessageEmbed()
        .setTitle(`SERVER TEMPLATE`)
        .addField("URL", Formatters.codeBlock("fix", `${(await guild.fetchTemplates()).map(v => v.url)}`))
        .addField("Code", Formatters.codeBlock("fix", `${(await guild.fetchTemplates()).map(v => v.code)}`))
        .setColor("RANDOM")
      return message.reply({ embeds: [templateCreated] })
    }
  },
};