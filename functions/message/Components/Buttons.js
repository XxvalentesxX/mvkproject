const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

class Buttons {
  static buttons = [];

  static Set(config) {
    const validStyles = {
      PRIMARY: 1,
      SECONDARY: 2,
      SUCCESS: 3,
      DANGER: 4,
      LINK: 5,
    };

    const configs = Array.isArray(config) ? config : [config];
    const ids = [];

    configs.forEach((button) => {
      const { id, label, style, emoji, row, disabled } = button;

      if (!id) {
        console.error('The "id" field is required for buttons.');
        return;
      }

      if (ids.includes(id)) {
        console.error(`Duplicate button ID detected: "${id}". Each button must have a unique ID.`);
        return;
      }
      ids.push(id);

      if (!style) {
        console.error('The "style" field is required for buttons.');
        return;
      }

      const buttonStyle = validStyles[style.toUpperCase()];
      if (!buttonStyle) {
        console.error(`The style "${style}" is not valid. Valid styles: success, danger, primary, secondary, link.`);
        return;
      }

      if (buttonStyle === 5 && !id.startsWith('http')) {
        console.error('For buttons with "link" style, the "id" must be a valid URL.');
        return;
      }

      if (!label && !emoji) {
        console.error('At least one of these must be specified: "label" or "emoji" for the button.');
        return;
      }

      const buttonLabel = label || (emoji ? ' ' : '');

      const buttonData = new ButtonBuilder()
        .setLabel(buttonLabel)
        .setStyle(buttonStyle)
        .setDisabled(!!disabled);

      if (buttonStyle === 5) {
        buttonData.setURL(id);
      } else {
        buttonData.setCustomId(id);
        if (emoji) buttonData.setEmoji(emoji);
      }

      Buttons.buttons.push({ buttonData, row });
    });
  }

  static Return() {
    if (Buttons.buttons.length === 0) {
      console.error('No buttons have been created to return.');
      return;
    }

    const rows = [];
    let currentRow = new ActionRowBuilder();

    Buttons.buttons.forEach(({ buttonData, row }) => {
      if (row) {
        if (currentRow.components.length > 0) {
          rows.push(currentRow);
          currentRow = new ActionRowBuilder();
        }
        rows.push(new ActionRowBuilder().addComponents(buttonData));
      } else {
        currentRow.addComponents(buttonData);
        if (currentRow.components.length === 5) {
          rows.push(currentRow);
          currentRow = new ActionRowBuilder();
        }
      }
    });

    if (currentRow.components.length > 0) rows.push(currentRow);

    Buttons.buttons = [];
    return rows;
  }
}

module.exports = { Buttons };
