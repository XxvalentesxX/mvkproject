const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

class EditButton {
  static async Edit(config) {
    const { id, label, disabled, message } = config;

    if (!id) {
      console.error('The "id" field is required to edit a button.');
      return;
    }

    if (!message) {
      console.error('The "message" field is required to edit a button.');
      return;
    }

    try {
      const components = message.components.map(row => row.toJSON());
      let buttonFound = false;

      const updatedComponents = components.map(row => {
        row.components = row.components.map(btn => {
          if (btn.custom_id === id) {
            buttonFound = true;

            const updatedButton = new ButtonBuilder(btn)
              .setLabel(label || btn.label)
              .setDisabled(disabled === undefined ? btn.disabled : disabled);

            return updatedButton;
          }
          return btn;
        });
        return row;
      });

      if (!buttonFound) {
        console.error(`Button with ID "${id}" not found.`);
        return;
      }

      await message.edit({
        components: updatedComponents.map(row => new ActionRowBuilder(row))
      });
      console.log('Button edited successfully');
    } catch (error) {
      console.error('Error while editing the message:', error);
    }
  }
}

module.exports = { EditButton };
