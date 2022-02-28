const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name : 'scramble',
    aliases: ['scr', 'scram'],
    ownerOnly: false,
    cooldown: 3,
    description: 'Attempt to unscramble the given scrambled word',
    maintenance: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async(client, message, args) => {
        let words = require('../../assets/words.json');
        let word = words[parseInt(Math.random() * words.length)];

        let scrambled = word.split('');
    
        scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        while(scrambled.join('') == word) scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        message.channel.send(`Your word is... \`${scrambled.join('')}\`! Unscramble the given word in **50** seconds. You have **5** try!`);

         let counter = 0;
         const filter = msg => !msg.author.bot;
         const collector = message.channel.createMessageCollector({ filter, time: 50000})

         collector.on('collect', async(msg) => {
             counter++;
             if(counter === 5) {
                 collector.stop();
             }
             if (msg.content.toLowerCase() == word.toLowerCase()) {
                msg.reply(`That's correct! Good job!`);
                collector.stop();
             }
             else {
                await message.channel.send("`That's incorrect. Try again!`")
            }
            
         });
         collector.on('end', async(collected) => {
             if(counter === 5 ) {
                message.channel.send(`You have run out of moves, the right word is \`${word}\``);
             } 
             else if (collected.size == 0) {
                message.channel.send(`You have been timed out! The answer is \`${word}\`. Respond quicker next time.`);
             } else if (collected.size == 5) return


         });
         
    }
};
