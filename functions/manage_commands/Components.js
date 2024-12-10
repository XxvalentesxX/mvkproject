const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder } = require('discord.js');

class Component {
  static Type = {
    Menu: 'menu',
    MenuOption: 'menu-option',
    Button: 'button',
  };

  static Interaction = {
    Link: (filePath) => ({
      type: 'link',
      filePath,
    }),
  };

  static menus = new Map();
  static options = new Map();
  static buttons = [];

  static Create(config) {
    const { type, id, action, label, menu, description, emoji, default: isDefault, style, link, row } = config;

    if (!type || !id) {
      throw new Error('Type and id are required to create a component.');
    }

    if (type === this.Type.Menu) {
      if (!action) {
        throw new Error('Action is required for a menu.');
      }

      const menuData = { id, type, action };

      if (this.menus.has(id)) {
        throw new Error(`Menu with ID "${id}" already exists.`);
      }

      this.menus.set(id, menuData);
    } else if (type === this.Type.MenuOption) {
      if (!menu) {
        throw new Error('Menu ID is required for a menu option.');
      }

      if (!this.menus.has(menu)) {
        throw new Error(`Menu with ID "${menu}" does not exist. Create the menu first.`);
      }

      const optionData = {
        label,
        value: `${id}`,
        description: description || null,
        emoji: emoji || null,
        default: isDefault || false,
      };

      if (!this.options.has(menu)) {
        this.options.set(menu, []);
      }

      const options = this.options.get(menu);

      if (options.some(option => option.value === optionData.value)) {
        throw new Error(`Option with ID "${id}" already exists in menu "${menu}".`);
      }

      options.push(optionData);
    } else if (type === this.Type.Button) {
      const validStyles = {
        PRIMARY: 1,
        SECONDARY: 2,
        SUCCESS: 3,
        DANGER: 4,
        LINK: 5,
      };

      const buttonStyle = validStyles[style?.toUpperCase()] || validStyles.PRIMARY;
      const buttonData = { id, label, style: buttonStyle, link: link || null, row: row ?? false };

      if (buttonStyle === 5 && link) {
        buttonData.url = link;
      }

      this.buttons.push(buttonData);
    } else {
      throw new Error(`Unknown component type: ${type}`);
    }
  }

  static async Add({ type, id, message }) {
    if (!type || !id || !message) {
      throw new Error('Type, id, and message are required to add a component.');
    }

    if (type === this.Type.Menu) {
      if (!this.menus.has(id)) {
        throw new Error(`Menu with ID "${id}" not found. Ensure it is created first.`);
      }

      const options = this.options.get(id);

      if (!options || options.length === 0) {
        throw new Error(`No options found for menu with ID: ${id}`);
      }

      const menu = new StringSelectMenuBuilder()
        .setCustomId(id)
        .setPlaceholder('Select an option')
        .addOptions(
          options.map(option => ({
            label: option.label,
            value: option.value,
            description: option.description || '',
            emoji: option.emoji || '',
            default: option.default,
          }))
        );

      const row = new ActionRowBuilder().addComponents(menu);

      try {
        await message.edit({
          content: message.content,
          components: [row],
        });
      } catch (error) {
        console.error(`Error adding menu to message: ${error.message}`);
      }
    } else if (type === this.Type.Button) {
      if (this.buttons.length === 0) {
        throw new Error('No buttons have been created.');
      }

      const buttonRows = [];
      let currentRow = new ActionRowBuilder();

      this.buttons.forEach(buttonData => {
        const button = new ButtonBuilder()
          .setCustomId(buttonData.id)
          .setLabel(buttonData.label)
          .setStyle(buttonData.style);

        if (buttonData.style === 5 && buttonData.link) {
          button.setURL(buttonData.link);
        }

        if (buttonData.row) {
          if (currentRow.components.length > 0) {
            buttonRows.push(currentRow);
            currentRow = new ActionRowBuilder();
          }
          buttonRows.push(new ActionRowBuilder().addComponents(button));
        } else {
          currentRow.addComponents(button);
          if (currentRow.components.length === 5) {
            buttonRows.push(currentRow);
            currentRow = new ActionRowBuilder();
          }
        }
      });

      if (currentRow.components.length > 0) {
        buttonRows.push(currentRow);
      }

      try {
        await message.edit({
          content: message.content,
          components: buttonRows,
        });
      } catch (error) {
        console.error(`Error adding buttons to message: ${error.message}`);
      }
    } else {
      throw new Error(`Unknown component type: ${type}`);
    }
  }

  static Return() {
    const components = [];

    this.menus.forEach(menu => {
      const menuOptions = this.options.get(menu.id) || [];
      const menuRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(menu.id)
          .setPlaceholder('Select an option')
          .addOptions(
            menuOptions.map(option => ({
              label: option.label,
              value: option.value,
              description: option.description || '',
              emoji: option.emoji || '',
              default: option.default,
            }))
          )
      );

      components.push(menuRow);
    });

    if (this.buttons.length > 0) {
      const buttonRows = [];
      let currentRow = new ActionRowBuilder();

      this.buttons.forEach(buttonData => {
        const button = new ButtonBuilder()
          .setCustomId(buttonData.id)
          .setLabel(buttonData.label)
          .setStyle(buttonData.style);

        if (buttonData.style === 5 && buttonData.link) {
          button.setURL(buttonData.link);
        }

        if (buttonData.row) {
          if (currentRow.components.length > 0) {
            buttonRows.push(currentRow);
            currentRow = new ActionRowBuilder();
          }
          buttonRows.push(new ActionRowBuilder().addComponents(button));
        } else {
          currentRow.addComponents(button);
          if (currentRow.components.length === 5) {
            buttonRows.push(currentRow);
            currentRow = new ActionRowBuilder();
          }
        }
      });

      if (currentRow.components.length > 0) {
        buttonRows.push(currentRow);
      }

      components.push(...buttonRows);
    }

    this.menus.clear();
    this.options.clear();
    this.buttons = [];

    return components;
  }
}

module.exports = Component;
