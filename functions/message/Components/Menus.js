const { ActionRowBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder } = require('discord.js');

class Menus {
  static menus = new Map();

  static Set(config) {
    const configs = Array.isArray(config) ? config : [config];

    configs.forEach((menu) => {
      const { id, type, placeholder, options } = menu;

      if (!id) {
        console.error('The "id" field is required for menus.');
        return;
      }

      if (!type) {
        console.error('The "type" field is required for menus.');
        return;
      }

      const validTypes = ['user', 'channel', 'role', 'normal'];
      if (!validTypes.includes(type)) {
        console.error(`The type "${type}" is invalid. Valid types are: ${validTypes.join(', ')}.`);
        return;
      }

      if (type === 'normal' && !options) {
        console.error('The "options" field is required for "normal" type menus.');
        return;
      }

      if (type === 'normal' && !Array.isArray(options)) {
        console.error('The "options" field must be an array for "normal" type menus.');
        return;
      }

      if (options) {
        options.forEach(({ value, label }) => {
          if (!value) {
            console.error('The "value" field is required for menu options.');
            return;
          }

          if (!label) {
            console.error('The "label" field is required for menu options.');
            return;
          }
        });
      }

      if (Menus.menus.has(id)) {
        console.error(`A menu with the ID "${id}" already exists. IDs must be unique.`);
        return;
      }

      Menus.menus.set(id, { id, type, placeholder, options });
    });
  }

  static Return() {
    const rows = [];

    Menus.menus.forEach((menu) => {
      const { id, type, placeholder, options } = menu;
      let selectMenu;

      if (type === 'normal') {
        selectMenu = new StringSelectMenuBuilder().setCustomId(id).setPlaceholder(placeholder || '');
        selectMenu.addOptions(
          options.map(({ value, label, emoji, description, default: isDefault }) => ({
            value,
            label,
            emoji: emoji || undefined,
            description: description || undefined,
            default: !!isDefault,
          }))
        );
      } else if (type === 'user') {
        selectMenu = new UserSelectMenuBuilder().setCustomId(id).setPlaceholder(placeholder || '');
      } else if (type === 'channel') {
        selectMenu = new ChannelSelectMenuBuilder().setCustomId(id).setPlaceholder(placeholder || '');
      } else if (type === 'role') {
        selectMenu = new RoleSelectMenuBuilder().setCustomId(id).setPlaceholder(placeholder || '');
      }

      selectMenu.setMinValues(1).setMaxValues(1);

      rows.push(new ActionRowBuilder().addComponents(selectMenu));
    });

    Menus.menus.clear();
    return rows;
  }
}

module.exports = { Menus };
