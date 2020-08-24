module.exports = {
    name: 'ping',
    description: 'Ping!',
    args: true,
    guildOnly: true,
    usage: false,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
