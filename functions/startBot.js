const { Client, GatewayIntentBits } = require('discord.js');

let client;

function startBot({ token, prefix, intents }) {
  if (!token) {
    console.error("Token is missing.");
    return;
  }

  if (!prefix) {
    console.error("Prefix is missing.");
    return;
  }

  if (!intents || intents.length === 0) {
    console.error("Intents are missing.");
    return;
  }

  client = new Client({
    intents: intents.map(intent => GatewayIntentBits[intent] || intent),
  });

  client.prefix = prefix;

  client.login(token)
    .then(() => console.log('Bot logged in successfully!'))
    .catch(err => console.error('Error logging in:', err));

  return client;
}

function getClient() {
  if (!client) {
    console.error('Client is not initialized. Please call startBot first.');
    return null;
  }
  return client;
}

module.exports = { startBot, getClient };
