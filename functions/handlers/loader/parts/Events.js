const fs = require('fs');
const path = require('path');

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

          if (typeof eventModule === 'function') {
            eventModule(client);
            results.loaded.push(file);
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
