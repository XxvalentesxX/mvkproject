// loadSlashCommandsHandler.js
const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * Carga y registra todos los comandos slash desde una carpeta.
 * @param {string} folderPath - Ruta de la carpeta que contiene los comandos slash.
 * @param {Client} client - Instancia del cliente de Discord.
 */
function loadSlashCommandsHandler(folderPath, client) {
  client.slashCommands = new Collection();

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

          if (command.data && command.execute) {
            client.slashCommands.set(command.data.name, command);
            console.log(`Comando slash cargado: ${command.data.name}`);
          }
        } catch (error) {
          console.error(`Error al cargar el archivo ${filePath}:`, error);
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.once('ready', async () => {
    const commands = client.slashCommands.map(cmd => cmd.data);
    try {
      await client.application.commands.set(commands);
      console.log('Comandos slash registrados correctamente.');
    } catch (error) {
      console.error('Error al registrar comandos slash:', error);
    }
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.slashCommands.get(commandName);
    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error al manejar la interacción del comando slash ${commandName}:`, error);
        await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
      }
    }
  });
}

module.exports = loadSlashCommandsHandler;
