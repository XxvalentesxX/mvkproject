const { Collection } = require('discord.js');

const commands = new Collection();

function newCommand({ name, aliases = [], description, code }) {
  if (!name || !description || !code) {
    throw new Error('Command must have a name, description, and code.');
  }

  commands.set(name.toLowerCase(), { description, code });

  aliases.forEach(alias => {
    commands.set(alias.toLowerCase(), { description, code });
  });
}

async function handleCommand(message) {
  const prefix = message.client.prefix.toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
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
