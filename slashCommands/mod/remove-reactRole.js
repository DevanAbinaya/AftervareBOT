const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const rrModel = require('../../models/reactionroles')

module.exports = {
    name: 'roles-remove',
    description: 'remove a custom reaction role',
    userperm: ['MANAGE_ROLES'],
    botperm: ['MANAGE_ROLES'],
    ownerOnly: true,
    options: [
        {
            name: 'role',
            description: 'role to be remove',
            type: 'ROLE',
            required: true
        },
  ],
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const role = interaction.options.getRole("role");
        
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
        if(!guildData) return interaction.followUp("There is no roles in this server!");

        const guildRoles = guildData.roles;

        const findRole = guildRoles.find(x => x.roleId === role.id);
        if(!findRole) return interaction.followUp("That role is not added to the reaction roles list")

        const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)
        guildData.roles = filteredRoles;

        await guildData.save()

        interaction.followUp(`Removed: **${role.name}**`)

    }
 }  