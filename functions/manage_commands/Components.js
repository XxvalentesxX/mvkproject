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
      const { type, id, action, label, menu, description, emoji, default: isDefault } = config;
  
      if (!type || !id) {
        throw new Error('Type and id are required to create a component.');
      }
  
      if (type === this.Type.Menu) {
        if (!action) {
          throw new Error('Action is required for a menu.');
        }
  
        const menuData = {
          id,
          type,
          action,
        };
  
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
          value: `${menu}-${id}`,
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
        const buttonData = {
          id,
          label,
        };
  
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
          .addOptions(options.map(option => ({
            label: option.label,
            value: option.value,
            description: option.description || '',
            emoji: option.emoji || '',
            default: option.default,
          })));
  
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
  
        this.buttons.forEach(buttonData => {
          const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(buttonData.id)
              .setLabel(buttonData.label)
              .setStyle('PRIMARY')
          );
  
          buttonRows.push(buttonRow);
        });
  
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
        const menuRow = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(menu.id)
              .setPlaceholder('Select an option')
              .addOptions(menuOptions.map(option => ({
                label: option.label,
                value: option.value,
                description: option.description || '',
                emoji: option.emoji || '',
                default: option.default,
              })))
          );
  
        components.push(menuRow);
      });
  
      if (this.buttons.length > 0) {
        const buttonRows = [];
  
        this.buttons.forEach(buttonData => {
          const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(buttonData.id)
              .setLabel(buttonData.label)
              .setStyle('PRIMARY')
          );
  
          buttonRows.push(buttonRow);
        });
  
        components.push(...buttonRows);
      }
  
      return components;
    }
}

module.exports = Component;
