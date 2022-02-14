const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name : 'scramble',
    aliases: ['scr', 'scram'],
    ownerOnly: false,
    cooldown: 3,
    description: 'Attempt to unscramble the given scrambled word',
    maintenance: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async(client, message, args) => {
       let words = ['modern', 'low', 'high', 'mountain', 'cow', 'help', 'somebody', 'works', 'something', "abandon", "ability ", "able", "abortion", 'above', 'abroad', 'absence', 'absolute', 'absorb', 'academic', 'accept', 'access', 'accident', 'accompany', 'accomplish', 'according', 'account', 'achievement', 'action', 'advance', 'advertising', 'advice', 'age', 'back', 'barrier', 'basic', 'basket', 'bathroom', 'battery', 'battle', 'beach', 'bean', 'beat', 'birth', 'blue', 'board', 'bomb', 'bond', 'book', 'boat', 'bone', 'bite', 'brother', 'brand', 'brick', 'bridge', 'broken', 'British', 'busy', 'cabin', 'capacity', 'capital', 'carbon', 'car', 'carry', 'cat', 'cash', 'captain', 'card', 'category', 'celebrate', 'center', 'century', 'chairman', 'chapter', 'charity', 'chart', 'cheap', 'check', 'cheek', 'cheese', 'chemical', 'choose', 'citizen', 'civil', 'clear', 'client', 'closer', 'club', 'coal', 'cold', 'complex', 'concept', 'consume', 'cotton', 'craft', 'death', 'deep', 'dimension', 'drugs', 'drop', 'dinner', 'earth', 'draw', 'easy', 'economic', 'egg', 'employee', 'empty', 'end', 'enemy', 'engineering', 'enjoy', 'event', 'everyday', 'example', 'extend', 'factory', 'failure', 'false', 'family', 'fantasy', 'fast', 'father', 'feed', 'fight', 'final', 'find', 'finger', 'first', 'flame', 'foundation', 'freeze', 'fresh', 'friend', 'fuel', 'galaxy', 'gather', 'gaze', 'general', 'gentleman', 'ghost', 'gift', 'global', 'grade', 'grass', 'great', 'green', 'gun', 'habitat', 'half', 'handle', 'happen', 'happy', 'hard', 'hate', 'hearing', 'heat', 'heavily', 'heel', 'height', 'helicopter', 'hello', 'holy', 'highway', 'history', 'honey', 'hotel'];
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
             } else {
                message.channel.send(`You have been timed out! The answer is \`${word}\`. Respond quicker next time.`);
             }
         });
         
    }
};