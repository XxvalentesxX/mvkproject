const { Client, GatewayIntentBits } = require('discord.js');
const sendMessage = require('./functions/sendMessage');
const banUser = require('./moderation/ban');
const { handleButtonInteractions } = require('./components/buttons');

let clientInstance;

function startBot(config) {
    const { token, intents, consoleLog, consoleError, prefix } = config;
    const resolvedIntents = intents.map(intent => GatewayIntentBits[intent]);

    const client = new Client({ intents: resolvedIntents });

    client.once('ready', () => {
        if (consoleLog) {
            console.log(consoleLog.replace('${bot.username}', client.user.username));
        } else {
            console.log(`Bot is online as ${client.user.tag}`);
        }
    });

    client.on('error', (error) => {
        if (consoleError) {
            console.error(consoleError, error);
        } else {
            console.error('An error occurred:', error);
        }
    });

    client.on('interactionCreate', async (interaction) => {
        try {
            await handleButtonInteractions(interaction);
        } catch (error) {
            console.error('Error handling interaction:', error);
        }
    });

    if (prefix) {
        client.prefix = prefix;
    }

    client.sendMessage = function (options) {
        return sendMessage.call(this, options);
    };

    client.banUser = (options) => banUser(options);

    client.login(token);

    clientInstance = client;

    return client;
}

module.exports = {
    startBot,
    getClient: () => clientInstance
};
