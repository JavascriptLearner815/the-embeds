module.exports = {
    name: 'rick',
    description: 'What do you think it does?',
    args: true,
    usage: '<user> <message>',
    guildOnly: true,
    cooldown: 60,
    aliases: ['rickroll', 'rickastley', 'nevergonnagiveyouup'],
    execute(message, args) {
        const user = message.mentions.users.first();

        const content = args.slice(1).join(' ');

        const dm = `${content} <https://www.youtube.com/watch?v=dQw4w9WgXcQ>`;

        try {
            user.send(dm);
        } catch (err) {
            console.error('Could not DM rickroll:', err);
            return message.reply('I couldn\'t DM them the rickroll!');
        }
    },
};
