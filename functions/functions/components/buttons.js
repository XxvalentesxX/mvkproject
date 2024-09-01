const { ButtonBuilder, ButtonStyle, InteractionType } = require('discord.js');

const buttonInteractions = new Map();

function createButton({
  id,
  url,
  label,
  style,
  disabled = false,
  emoji
}) {
  if (!id && !url) {
    throw new Error('Either id or url is required.');
  }

  if (!label) {
    throw new Error('Label is required.');
  }

  if (!style) {
    throw new Error('Style is required.');
  }

  const buttonOptions = {
    customId: id,
    label,
    style,
    disabled
  };

  if (url) {
    buttonOptions.url = url;
  }

  if (emoji) {
    buttonOptions.emoji = { name: emoji };
  }

  return new ButtonBuilder(buttonOptions);
}

function addButtonInteraction({ id, interaction }) {
  buttonInteractions.set(id, interaction);
}

async function handleButtonInteractions(interaction) {
  if (interaction.type === InteractionType.MessageComponent && interaction.isButton()) {
    if (!interaction.replied && !interaction.deferred) {
      try {
        const buttonAction = buttonInteractions.get(interaction.customId);
        if (buttonAction) {
          await buttonAction(interaction);
        } else {
          console.error('No action found for button with customId:', interaction.customId);
        }
      } catch (error) {
        console.error('Error handling button interaction:', error);
      }
    }
  }
}

module.exports = { createButton, addButtonInteraction, handleButtonInteractions };
