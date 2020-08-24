module.exports = {
    name: 'kick',
    description: 'Removes someone from the server.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    cooldown: 5,
    aliases: ['remove'],
    execute(message, args) {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ');

        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You don\'t have the permission to kick members!');
        }

        if (member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You can\'t kick a moderator.');
        }

        if (member.user.id === message.author.id) {
            return message.channel.send('You can\'t kick yourself, to achieve this, just leave the server.');
        }

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('I don\'t have the permission to do that.');
        }

        member.kick(reason);
    },
};
