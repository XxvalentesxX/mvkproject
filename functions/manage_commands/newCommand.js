const { Collection } = require('discord.js');
const commands = new Collection();

function newCommand({ name, aliases = [], code }) {
  if (!name || !code) {
    console.error('Command must have a name and code.');
    return;
  }

  // Almacenar el comando principal
  commands.set(name, { code });

  // Almacenar los alias si los hay
  aliases.forEach(alias => {
    commands.set(alias, { code });
  });
}

async function handleCommand(message) {
  if (!message.content.startsWith(message.client.prefix)) return;

  const args = message.content.slice(message.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Buscar el comando usando el nombre o alias
  const command = commands.get(commandName);

  if (command) {
    try {
      await command.code(message, args); // Ejecutar el código del comando
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
    }
  }
}

module.exports = {
  newCommand,
  handleCommand
};
