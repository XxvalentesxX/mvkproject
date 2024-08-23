const { Collection } = require('discord.js');

const commands = new Collection();

function newCommand({ name, description, code }) {
  if (!name || !description || !code) {
    throw new Error('Command must have a name, description, and code.');
  }

  commands.set(name, { description, code });
}

async function handleCommand(message) {
  if (!message.content.startsWith(message.client.prefix)) return;

  const args = message.content.slice(message.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);

  if (command) {
    try {
      await command.code(message);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
    }
  }
}

module.exports = {
  newCommand,
  handleCommand
};
