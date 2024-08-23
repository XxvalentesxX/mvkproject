const { Client, GatewayIntentBits } = require('discord.js');
const sendMessage = require('./sendMessage');
const banUser = require('./ban');

function startBot(config) {
  const {
    token,
    intents,
    consoleLog,
    consoleError,
    prefix
  } = config;

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

  if (prefix) {
    client.prefix = prefix;
  }

  client.sendMessage = function (options) {
    return sendMessage.call(this, options);
  };
  client.banUser = (options) => banUser(options);
  client.login(token);

  return client;
}

module.exports = startBot;
