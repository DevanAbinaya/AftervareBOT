const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../src/models/djConfig");

module.exports = {
    id: "disableDjRole",
    permission: "ADMINISTRATOR",
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"],

    async execute(interaction, client) {

        const { guild } = interaction
        const DB_found = await DB.findOne({guildId: guild.id});
        if(DB_found)await DB_found.updateOne({ enabled: false });
        else await DB.create({guildID: guild.id, enabled: false });

        client.djConfig.set(guild.id, {
            enabled: false,
        });

        interaction.reply({ embeds: [new MessageEmbed().setDescription(`DJ Role has now been disabled`).setColor("BLURPLE").setTimestamp()], ephemeral: true})

}

}