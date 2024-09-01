const { ButtonBuilder } = require('discord.js');

function addButton({ newRow = false, buttonId, label, style, disabled = false, emoji }) {
  const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(style) // Asegúrate de que sea una cadena correcta: 'Primary', 'Secondary', 'Success', 'Danger', 'Link'
    .setDisabled(disabled);

  if (emoji) {
    button.setEmoji(emoji);
  }

  if (buttonId.id) {
    button.setCustomId(buttonId.id);
  } else if (buttonId.url) {
    button.setURL(buttonId.url);
  }

  return { button, newRow };
}

module.exports = addButton;
