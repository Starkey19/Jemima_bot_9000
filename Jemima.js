const { prefix, token} = require('./config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();


client.on('ready', () => {
    console.log('Ready!');

    //client.user.setActivity('Shykel', { type: 'WATCHING'});
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	}
	else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	else if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	else if (command === 'info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`First argument: ${args[0]}`);
    }
    else if (command === 'join')
    {
        const channel = message.guild.channels.get(matchMedia.content.split(' '[1]) || mesage.member.voiceChannel);

        if (!channel)
        {
            return message.reply("Thats not a voice channel.");
        }

        if (channel && channel.type === 'voice')
        {
            channel.join().then( joined => {
               message.reply("Joined " +  joined.find("name").toString());
            })
        }
    }
    else if (message.content === '!play') {
        
        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    }
});

client.login(token);