const { Collection } = require('discord.js');
const commands = new Collection();

function newCommand({ name, aliases = [], code }) {
  if (!name || !code) {
    console.error('Command must have a name and code.');
    return;
  }

  commands.set(name, { code });

  aliases.forEach(alias => {
    commands.set(alias, { code });
  });
}

async function handleCommand(message) {
  if (!message.content.startsWith(message.client.prefix)) return;

  const args = message.content.slice(message.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);

  if (command) {
    try {
      await command.code(message, args);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
    }
  }
}

module.exports = {
  newCommand,
  handleCommand
};
