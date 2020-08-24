const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all commands or information about a specific one.',
    aliases: ['commands'],
    usage: '<command name>',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUse \`${prefix}help <command name>\` to get information about a specific command.`);

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:**`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        return message.channel.send(data, { split: true });
    },
};