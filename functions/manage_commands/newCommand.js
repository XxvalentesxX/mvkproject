const { Collection } = require('discord.js');
const commands = new Collection();

function newCommand({ name, aliases = [], code }) {
  if (!name || !code) {
    console.error('Command must have a name and code.');
    return;
  }

<<<<<<< HEAD:functions/manage_commands/newCommand.js
  // Almacenar el comando principal
  commands.set(name, { code });

  // Almacenar los alias si los hay
  aliases.forEach(alias => {
    commands.set(alias, { code });
=======
  commands.set(name.toLowerCase(), { description, code });

  aliases.forEach(alias => {
    commands.set(alias.toLowerCase(), { description, code });
>>>>>>> f7f962b47f36e5399534fa7ae81f8ac34dc605d8:functions/manage_commands/newCommands.js
  });
}

async function handleCommand(message) {
  const prefix = message.client.prefix.toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
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
