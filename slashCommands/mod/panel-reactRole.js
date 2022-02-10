const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const rrModel = require('../../models/reactionroles')

module.exports = {
    name: 'roles-panel',
    description: 'reaction role panel',
    userperm: ['MANAGE_ROLES'],
    botperm: ['MANAGE_ROLES'],
    ownerOnly: true,
  
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const guildData = await rrModel.findOne({ guildId: interaction.guildId });
        if(!guildData?.roles) return interaction.followUp("There is no roles in this server!");

        const options = guildData.roles.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || "No description",
                emoji: x.roleEmoji
            };
        });

        const panelEmbed = new MessageEmbed()
            .setTitle('Select Your Roles!')
            .setDescription(`Choose an option from the menu below!`)
            .setImage('https://cdn.discordapp.com/attachments/938403930159841311/941252447031156736/PICK_ROLES.gif')
            .setColor('BLUE')

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('reaction-roles')
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ];

        interaction.channel.send({ embeds: [panelEmbed], components });

    }
 }  