const fs = reuire('fs');

module.exports = (client) => {
    client.handleButtons = async () => {
        const buttonFolders = fs.readdirSync('../Buttons');
        for (const folder of buttonFolders) {
            const buttonFiles = fs.readdirSync(`../Buttons/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of buttonFiles) {
                const button = require(`../Buttons/${folder}/${file}`);
                client.buttons.set(button.data.name, button);
            }
        }
    }
}