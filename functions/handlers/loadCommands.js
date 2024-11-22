const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('../manage_commands/newCommand');

const commandsStatus = new Map();

function loadCommands(folderPath, client) {
  const absolutePath = path.resolve(folderPath);

  function loadFromDir(dir) {
    if (!fs.existsSync(dir)) {
      console.error(`The directory ${dir} does not exist.`);
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
            commandsStatus.set(command.name, { enabled: true });
            newCommand(command);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.on('messageCreate', async (message) => {
    const prefix = client.prefix.toLowerCase(); // Convertir prefijo a minúsculas
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    try {
      await handleCommand(message, prefix);
    } catch (error) {
      console.error('Error handling command:', error);
    }
  });

  showCommandsStatus();
}

function showCommandsStatus() {
  const maxCommandLength = Math.max(...[...commandsStatus.keys()].map(cmd => cmd.length));

  const header = 'Commands';
  const separator = '-'.repeat(maxCommandLength + 3);

  console.log(header.padEnd(maxCommandLength + 3) + '| Status');
  console.log(separator);

  commandsStatus.forEach((status, commandName) => {
    const symbol = status.enabled ? '✅' : '❌';
    const commandNameFormatted = commandName.padEnd(maxCommandLength);
    console.log(`${commandNameFormatted} | ${symbol}`);
  });
}

module.exports = loadCommands;
