const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

async function Slashs(folderPath, client) {
  client.slashCommands = new Collection();

  const results = {
    loaded: [],
    errors: []
  };

  const absolutePath = path.resolve(folderPath);

  function loadFromDir(dir) {
    if (!fs.existsSync(dir)) {
      console.error(`Directory ${dir} does not exist.`);
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
            console.log(`Slash command loaded: ${command.data.name}`);
            results.loaded.push(command.data.name);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
          results.errors.push({ file: filePath, error: error.message });
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.once('ready', async () => {
    const commands = client.slashCommands.map(cmd => cmd.data);
    try {
      await client.application.commands.set(commands);
    } catch (error) {
      console.error('Error registering slash commands:', error);
      results.errors.push({ error: error.message });
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
        console.error(`Error handling interaction for slash command ${commandName}:`, error);
        await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
      }
    }
  });

  return results;
}

module.exports = Slashs;
