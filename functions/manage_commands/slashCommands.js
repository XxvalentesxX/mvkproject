const { SlashCommandBuilder } = require('@discordjs/builders');

function newSlashCommand({ name, description, options = [], code, subCommands = [] }) {
  const commandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  options.forEach(opt => {
    switch (opt.type) {
      case 'STRING':
        commandBuilder.addStringOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      case 'USER':
        commandBuilder.addUserOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      case 'BOOLEAN':
        commandBuilder.addBooleanOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      case 'INTEGER':
        commandBuilder.addIntegerOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      case 'CHANNEL':
        commandBuilder.addChannelOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      case 'ROLE':
        commandBuilder.addRoleOption(option =>
          option.setName(opt.name)
            .setDescription(opt.description)
            .setRequired(opt.required || false)
        );
        break;
      default:
        throw new Error(`Unsupported option type: ${opt.type}`);
    }
  });

  subCommands.forEach(subCmd => {
    commandBuilder.addSubcommand(subCmdBuilder => {
      subCmdBuilder.setName(subCmd.name)
        .setDescription(subCmd.description);

      subCmd.options.forEach(opt => {
        switch (opt.type) {
          case 'STRING':
            subCmdBuilder.addStringOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          case 'USER':
            subCmdBuilder.addUserOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          case 'BOOLEAN':
            subCmdBuilder.addBooleanOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          case 'INTEGER':
            subCmdBuilder.addIntegerOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          case 'CHANNEL':
            subCmdBuilder.addChannelOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          case 'ROLE':
            subCmdBuilder.addRoleOption(option =>
              option.setName(opt.name)
                .setDescription(opt.description)
                .setRequired(opt.required || false)
            );
            break;
          default:
            throw new Error(`Unsupported option type in subcommand: ${opt.type}`);
        }
      });

      return subCmdBuilder;
    });
  });

  return {
    data: commandBuilder.toJSON(),
    execute: async (interaction) => {
      try {
        if (interaction.isCommand() && interaction.commandName === name) {
          await code(interaction);
        }
      } catch (error) {
        console.error(`Error executing command ${name}:`, error);
        await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
      }
    }
  };
}

function subCommand({ name, description, options = [], code }) {
  return {
    name,
    description,
    options,
    code
  };
}

function slashOption(interaction, optionName) {
  const option = interaction.options.get(optionName);

  if (option) {
    return String(option.value);
  } else {
    throw new Error(`Option ${optionName} not found in the interaction.`);
  }
}



module.exports = { newSlashCommand, subCommand, slashOption };
