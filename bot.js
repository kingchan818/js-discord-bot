const Discord = require('discord.js');
require('dotenv').config();
const youtube_music = require('ytdl-core');

const client = new Discord.Client();
client.login(`${process.env.BOT_TOKEN}`);

client.on('ready', () => {
    console.log('\x1b[36m', ' ======>   connected............');
    client.user.setActivity('with his dick', { type: 'PLAYING' });
});

const musicArray = [];
var isplaying = false;

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
    const messageArray = message.content.split(' ');
    if (!message.member.voice.channel) return;

    if (messageArray[0] === '!/play') {
        var connection = await message.member.voice.channel.join();
        play(connection, messageArray[1], messageArray);
    }
    if (messageArray[0] === '!/stop') {
        var connection = await message.member.voice.channel.join();
        stop(connection, messageArray[1]);
    }
    if (messageArray[0] === '!/add') {
        add(messageArray[1], message);
    }
});

async function play(connection, url, messageArray, message) {
    if (messageArray.length > 0) {
        musicArray.push(url);
        console.log(musicArray);
    }

    for (i = 0; i < musicArray.length; i++) {
        console.log(musicArray.length);
        let music = youtube_music(url, { filter: 'audioonly' });
        let dispatcher = connection.play(music);

        isplaying = true;
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            musicArray.shift();
            isplaying = false;
            console.log(musicArray);
        });
    }
}

function stop(connection, url) {
    if (isplaying) {
        connection.play(youtube_music(url, { filter: 'audioonly' })).pause();
        console.log('stop');
        isplaying = false;
        console.log('isplaying ====>', isplaying);
    }
}

function add(url, message) {
    // add non playing songs to music array
    musicArray.push(url);
    message.channel.send(' song add to queue ');
    console.log(musicArray);
}
