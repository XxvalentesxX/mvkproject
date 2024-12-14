const fs = require('fs');
const path = require('path');

async function Interactions(directory, client) {
  const dirPath = path.resolve(directory);

  const results = {
    loaded: [],
    errors: []
  };

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'buttons'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'menus'), { recursive: true });
  }

  const loadFiles = (subDir, type) => {
    const files = fs.readdirSync(subDir).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
      const filePath = path.join(subDir, file);

      try {
        const interaction = require(path.resolve(filePath));

        if (interaction && typeof interaction.code === 'function') {
          client.on('interactionCreate', async (interactionInstance) => {
            try {
              if (
                interactionInstance.customId === interaction.id
              ) {
                await interaction.code(interactionInstance);
              }
            } catch (error) {
              console.error(`Error handling interaction: ${interactionInstance.customId}`, error);
              results.errors.push({ file: filePath, error: error.message });
            }
          });

          results.loaded.push({
            file: file,
            type: type
          });
        }
      } catch (error) {
        console.error(`Error loading interaction from ${filePath}:`, error);
        results.errors.push({ file: filePath, error: error.message });
      }
    });
  };

  ['buttons', 'menus'].forEach((subFolder) => {
    const subDir = path.join(dirPath, subFolder);
    if (fs.existsSync(subDir)) {
      loadFiles(subDir, subFolder);
    }
  });

  return results;
}

module.exports = Interactions;
