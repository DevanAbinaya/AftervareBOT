const client = require("../..");
const Discord = require('discord.js');
const fetch = require("node-fetch");

client.on("messageCreate", async message => {
    if (message.channel.name == "chatbot") {
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
    return message.channel.send(`**:x: Please dont mention anyone**`);
     }
      message.channel.sendTyping();
    if (!message.content) return message.channel.send("Please say something.");
    fetch(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(message.content)}&owner=Factiven&botname=AftervareBOT`)
        //`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=Factiven`
        .then(res => res.json())
        .then(data => {
            message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.response}`);
        });
          
    }
    });