// functions/newCommands.js
const { Collection } = require('discord.js');

const commands = new Collection();

/**
 * Crea un nuevo comando y lo almacena en la colección.
 * @param {Object} commandData - Datos del comando.
 * @param {string} commandData.name - Nombre del comando.
 * @param {string} commandData.description - Descripción del comando.
 * @param {Function} commandData.code - Función a ejecutar cuando se llama el comando.
 */
function newCommand({ name, description, code }) {
  if (!name || !description || !code) {
    throw new Error('El comando debe tener un nombre, una descripción y un código.');
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
      console.error(`Error al ejecutar el comando ${commandName}:`, error);
    }
  }
}

module.exports = {
  newCommand,
  handleCommand
};
