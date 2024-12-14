const fs = require('fs');
const path = require('path');
const { newEvent } = require('../../add-ons/SetEvent');

async function Events(directory, client) {
  const absolutePath = path.resolve(directory);

  const results = {
    loaded: [],
    errors: []
  };

  function loadFromDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        loadFromDir(filePath);
      } else if (file.endsWith('.js')) {
        try {
          const eventModule = require(filePath);

          if (eventModule && typeof eventModule.code === 'function') {
            newEvent(eventModule)(client);
            results.loaded.push(file);
          } else {
            return console.error(`Invalid event in ${filePath}`);
          }
        } catch (error) {
          console.error(`Error loading event from ${filePath}:`, error);
          results.errors.push({ file: filePath, error: error.message });
        }
      }
    });
  }

  loadFromDir(absolutePath);

  return results;
}

module.exports = Events;
