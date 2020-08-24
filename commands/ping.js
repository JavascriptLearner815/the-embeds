module.exports = {
    name: 'ping',
    description: 'Ping!',
    args: false,
    guildOnly: true,
    usage: false,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
