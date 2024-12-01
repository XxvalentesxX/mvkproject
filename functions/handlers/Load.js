const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('../manage_commands/newCommand');
const commandsStatus = new Map();

class Load {
  static async Interactions(directory, client) {
    const dirPath = path.resolve(directory);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      fs.mkdirSync(path.join(dirPath, 'buttons'), { recursive: true });
      fs.mkdirSync(path.join(dirPath, 'menus'), { recursive: true });
    }

    const loadFiles = (subDir) => {
      const files = fs.readdirSync(subDir).filter((file) => file.endsWith('.js'));
      files.forEach((file) => {
        const filePath = path.join(subDir, file);
        const interaction = require(filePath);

        if (interaction && typeof interaction.code === 'function') {
          client.on('interactionCreate', async (interactionInstance) => {
            if (interactionInstance.customId === interaction.id) {
              await interaction.code(interactionInstance);
            }
          });
        }
      });
    };

    ['buttons', 'menus'].forEach((subFolder) => {
      const subDir = path.join(dirPath, subFolder);
      if (fs.existsSync(subDir)) {
        loadFiles(subDir);
      }
    });
  }

  static async Commands(directory, client) {
    const absolutePath = path.resolve(directory);

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
      const prefix = client.prefix.toLowerCase();
      if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

      try {
        await handleCommand(message, prefix);
      } catch (error) {
        console.error('Error handling command:', error);
      }
    });

    showCommandsStatus();
  }

  static async Events(directory, client) {
    const absolutePath = path.resolve(directory);

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
            }
          } catch (error) {
            console.error(`Error loading event from ${filePath}:`, error);
          }
        }
      });
    }

    loadFromDir(absolutePath);
  }

  static async Slashs(folderPath, client) {
    client.slashCommands = new Collection();
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
            }
          } catch (error) {
            console.error(`Error loading file ${filePath}:`, error);
          }
        }
      });
    }

    loadFromDir(absolutePath);

    client.once('ready', async () => {
      const commands = client.slashCommands.map(cmd => cmd.data);
      try {
        await client.application.commands.set(commands);
        console.log('Slash commands successfully registered.');
      } catch (error) {
        console.error('Error registering slash commands:', error);
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
  }

  static async All(input, client) {
    const defaultPaths = {
      events: './src/events',
      commands: './src/commands',
      interactions: './src/interactions',
      slashs: './src/slashs',
    };

    const paths = typeof input === 'string' ? defaultPaths : { ...defaultPaths, ...input };

    Object.keys(paths).forEach((key) => {
      const folderPath = paths[key];
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder for ${key} at: ${folderPath}`);
      }
    });

    if (paths.events) await this.Events(paths.events, client);
    if (paths.commands) await this.Commands(paths.commands, client);
    if (paths.interactions) await this.Interactions(paths.interactions, client);
    if (paths.slashs) await this.Slashs(paths.slashs, client);
  }
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

module.exports = Load;
