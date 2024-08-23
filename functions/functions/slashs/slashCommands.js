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
        throw new Error(`Tipo de opción no soportado: ${opt.type}`);
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
          // Agrega otros tipos de opciones según sea necesario
          default:
            throw new Error(`Tipo de opción no soportado en subcomando: ${opt.type}`);
        }
      });

      return subCmdBuilder;
    });
  });

  return {
    data: commandBuilder.toJSON(),
    execute: async (interaction) => {
      if (interaction.isCommand()) {
        await code(interaction);
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

module.exports = { newSlashCommand, subCommand };
