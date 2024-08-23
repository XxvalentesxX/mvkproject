// functions/loadHandler.js
const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('./newCommands'); 

/**
 * Carga todos los comandos desde una carpeta y sus subcarpetas.
 * @param {string} folderPath - Ruta de la carpeta que contiene los comandos.
 * @param {Client} client - Instancia del cliente de Discord.
 */
function loadHandler(folderPath, client) {
  const absolutePath = path.resolve(folderPath);

  function loadFromDir(dir) {
    if (!fs.existsSync(dir)) {
      console.error(`El directorio ${dir} no existe.`);
      return;
    }

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        loadFromDir(filePath);
      } else if (file.endsWith('.js')) {
        try {
          const command = require(filePath);

          if (command && typeof command === 'object' && command.name) {
            newCommand(command);
            console.log(`Comando cargado: ${command.name}`);
          }
        } catch (error) {
          console.error(`Error al cargar el archivo ${filePath}:`, error);
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.on('messageCreate', async message => {
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;

    try {
      await handleCommand(message);
    } catch (error) {
      console.error('Error al manejar el comando:', error);
    }
  });
}

module.exports = loadHandler;
