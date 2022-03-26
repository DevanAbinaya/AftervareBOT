const client = require("../..");
const { MessageEmbed } = require('discord.js');
const colors = require('../../src/assets/colors.json');

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        // await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        const userperm = interaction.member.permissions.has(cmd.userperm || []);

        // Permissions Handler
        if (!userperm) {
            let userperm = new MessageEmbed().setDescription(
                `*❌ You Need **${cmd.userperm}**  Permissions!*`
              );
         return interaction.followUp({embeds : [userperm]}); }

        const botperm = interaction.guild.me.permissions.has(cmd.botperm || []);
        if (!botperm) {
            let perms = new MessageEmbed().setDescription(
                `*❌ I Need **${cmd.botperm}** Permissions!*`
              );
         return interaction.followUp({embeds : [perms]}); }

        // Owners only handler
         const { owners } = require("../../src/config/config.json");
         if (cmd) {
            if (cmd.ownerOnly) {
                if (!owners.includes(interaction.user.id)) {
                    let ownerOnly = new MessageEmbed()
                        .setDescription( "*❌ Only Bot Developer can use this command!*" )
                    return interaction.followUp({embeds : [ownerOnly] })
            }}
        }

    // Maintenance handler
    if (cmd.maintenance) {
        if (!owners.includes(interaction.user.id)) {
            const down = {
              title: '<:error:939189126786318336> Oops my bad',
              description: "I'm really sorry that currently this command is in maintenance.\n> Please wait in patience until we fix this!",
              color: colors.red,
              timestamp: new Date(),
            };
            return interaction.followUp({
                embeds: [down],
            });
        }
    }

    // VoiceChannel 
    if (cmd.vc) {
        if (!interaction.member.voice.channel) {
            return interaction.reply({content: '**You must be in a voice channel to use this command**', ephemeral: true})
        }
    }  

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Reaction Roles Handling
    if(interaction.isSelectMenu()) {
        if(interaction.customId !== 'reaction-roles') return;
        await interaction.deferReply({ ephemeral: true })
        const roleId = interaction.values[0];
        const role = interaction.guild.roles.cache.get(roleId)
        const memberRoles = interaction.member.roles;
        
        const hasRole = memberRoles.cache.has(roleId);

        if(hasRole) {
            memberRoles.remove(roleId);
            interaction.followUp(`${role.name} has been removed from you`)
        } else {
            memberRoles.add(roleId)
            interaction.followUp(`${role.name} has been added to you`)
        }
    }
}); 
