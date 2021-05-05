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

    switch (messageArray[0]) {
        case '!/play':
            const connection = await message.member.voice.channel.join();
            if (messageArray.length > 0) {
                musicArray.push(messageArray[1]);
                console.log(musicArray);
            }
            const dispatcher = connection.play(youtube_music(musicArray[1], { filter: 'audioonly' }));
            dispatcher.setVolume(messageArray[2]);

            return dispatcher.on('finish', () => {
                console.log('Finished playing!');
                musicArray.shift();
            });
        case '-stop':
            return dispatcher.pause();
        default:
            return;
    }
    console.log(`jj is here`);
});
