const fs = require('fs');

const { prefix, token } = require('./config.json');

if (!prefix || !token) {
    process.exit(2);
}

const { Client, Collection } = require('discord.js');

const client = new Client();

const cooldowns = new Collection();

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

if (!commandFiles) {
    process.exit(3);
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t do that in DMs you dumb-dumb');
    }

    if (command.args && !args.length) {
        let reply = 'You need to provide some arguments.';

        if (command.usage) {
            reply = `Use it like this: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.reply(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Command on cooldown! ${timeLeft.toFixed(1)} second(s)`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error('Error executing command:', error);
        message.reply('there was an error executing that command.');
    }
});

process.on('exit', code => {
    console.log(`Exited with exit code ${code}.`);
});

client.login(token);