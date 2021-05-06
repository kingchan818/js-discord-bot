const Discord = require('discord.js');
require('dotenv').config();
const youtube_music = require('ytdl-core');
const axios = require('axios').default;

const client = new Discord.Client();
client.login(`${process.env.BOT_TOKEN}`);

client.on('ready', () => {
    console.log('hello i got a jj ');
    client.user.setActivity('with his dick', { type: 'PLAYING' });
});

client.on('message', async (msg) => {
    let token = msg.content.split(' ');
    if (token[0] == 'hello' || msg.content == 'hi') {
        msg.reply(`i got ur jj `);
    } else if (token[0] == '!gif') {
        let query = 'excited';
        if (token.length > 1) {
            // !gif yeah boi
            // given ["yeah", "boi"]

            query = token.slice(1, token.length).join(' ');
        }
        let url = `https://g.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA&limit=8`;
        let response = await axios.get(url);
        let json = await response.data;
        console.log(json);
        const index = Math.floor(Math.random() * json.results.length);
        msg.channel.send(json.results[index].url);
    }
});

client.on('message', async (message) => {
    let musicArray = [];
    const messageArray = message.content.split(' ');
    if (!message.guild) return;

    if (messageArray[0] === '!/play') {
        const connection = await message.member.voice.channel.join();

        if (messageArray.length > 0) {
            musicArray.push(messageArray[1]);
            console.log(`${typeof musicArray[0]} at line 45`);
        }

        const dispatcher = connection.play(youtube_music(musicArray[0], { filter: 'audioonly' }));

        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            musicArray.shift();
        });
    }

    if (messageArray[0] === '!/stop') {
    }

    console.log(`jj is here`);
});
