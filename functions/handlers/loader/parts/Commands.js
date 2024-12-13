const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('../../add-ons/SetCommand');

async function Commands(directory, client) {
  const absolutePath = path.resolve(directory);

  const results = {
    loaded: [],
    errors: []
  };

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
            newCommand(command);
            results.loaded.push(command.name);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
          results.errors.push({ file: filePath, error: error.message });
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.on('messageCreate', async (message) => {
    const prefix = client.prefix.toLowerCase();
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    try {
      await handleCommand(message, prefix);
    } catch (error) {
      console.error('Error handling command:', error);
    }
  });

  return results;
}

module.exports = Commands;
