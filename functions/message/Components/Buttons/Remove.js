const { ActionRowBuilder } = require('discord.js');

class RemoveButton {
  static async Remove(config) {
    const { id, message } = config;

    if (!id || !message) {
      console.error('The "id" and "message" fields are required to remove a button.');
      return;
    }

    const messageId = message.id;

    if (!Buttons.buttons[messageId]) {
      console.error(`No buttons found for message ID "${messageId}".`);
      return;
    }

    Buttons.buttons[messageId] = Buttons.buttons[messageId].filter(button => button.buttonData.customId !== id);

    if (Buttons.buttons[messageId].length === 0) {
      delete Buttons.buttons[messageId];
    }

    try {
      const components = message.components.map(row => row.toJSON());
      const updatedComponents = components.map(row => {
        row.components = row.components.filter(btn => btn.custom_id !== id);
        return row;
      });

      await message.edit({
        components: updatedComponents.map(row => new ActionRowBuilder(row))
      });
    } catch (error) {
      console.error('Error while removing the button:', error);
    }
  }
}

module.exports = { RemoveButton };
