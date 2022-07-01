const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    id: "djConfig",
    permission: "ADMINISTRATOR",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"],

    async execute(interaction, client) {
    
    const { guild } = interaction

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('enableDjRole') 
            .setStyle('SUCCESS')
            .setLabel('Enable'),
            new MessageButton()
            .setCustomId('disableDjRole') 
            .setStyle('DANGER')
            .setLabel('Disable'),
        ),


        mainEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("DJ Role Config")
        .setDescription("Execute **/dj-set** to set the DJ role. When enabled only members with this role or above can use Weave in your server. Enable and disable the use of the DJ Role with the buttons.")
        .setTimestamp()

        interaction.reply({ embeds: [mainEmbed], components: [row], ephemeral: true })

}
}