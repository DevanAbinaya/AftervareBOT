module.exports = {
    data: {
        name: `pauseMusic`
    },
    async execute (interaction, client) {
        await interaction.reply({ content: `You did it mate!`});
    }
}