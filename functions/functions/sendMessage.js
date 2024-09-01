const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

async function sendMessage({ channel, embeds = [], message = '', ephemeral = {}, components = {} }) {
  if (!channel) {
    throw new Error('Channel must be provided.');
  }

  if (typeof channel.send !== 'function') {
    throw new Error('The provided channel is not a valid Discord channel.');
  }

  // Handle ephemeral messages
  if (ephemeral.message || (ephemeral.embeds && Object.values(ephemeral.embeds).includes(true))) {
    if (ephemeral.message) {
      return channel.send({ content: message });
    }
    if (ephemeral.embeds) {
      const ephemeralEmbeds = embeds.filter((embed, index) => ephemeral.embeds[index]);
      return channel.send({ embeds: ephemeralEmbeds });
    }
  }

  // Validate and format embeds
  let formattedEmbeds = [];
  if (embeds.length > 0) {
    formattedEmbeds = embeds.map(embed => {
      if (embed instanceof EmbedBuilder) {
        return embed;
      } else {
        throw new Error('Each item in "embeds" must be an instance of EmbedBuilder.');
      }
    });
  }

  // Handle buttons and rows
  let rows = [];
  if (components.buttons) {
    const rowMessages = components.buttons.message || [];
    const rowEmbeds = components.buttons.embeds || {};

    // Process message buttons
    const messageButtons = rowMessages.map(buttonConfig => {
      if (!buttonConfig || !buttonConfig.buttonId || !buttonConfig.buttonId.id) {
        throw new Error('Each button must have a valid buttonId and id.');
      }

      return new ButtonBuilder()
        .setCustomId(buttonConfig.buttonId.id)
        .setLabel(buttonConfig.label || '')
        .setStyle(buttonConfig.style)
        .setDisabled(buttonConfig.disabled || false)
        .setEmoji(buttonConfig.emoji || null);
    });

    if (messageButtons.length > 0) {
      rows.push(new ActionRowBuilder().addComponents(...messageButtons));
    }

    // Process embed buttons
    for (const embedKey in rowEmbeds) {
      const embedButtons = rowEmbeds[embedKey].map(buttonConfig => {
        if (!buttonConfig || !buttonConfig.buttonId || !buttonConfig.buttonId.id) {
          throw new Error('Each button must have a valid buttonId and id.');
        }

        return new ButtonBuilder()
          .setCustomId(buttonConfig.buttonId.id)
          .setLabel(buttonConfig.label || '')
          .setStyle(buttonConfig.style)
          .setDisabled(buttonConfig.disabled || false)
          .setEmoji(buttonConfig.emoji || null);
      });

      if (embedButtons.length > 0) {
        rows.push(new ActionRowBuilder().addComponents(...embedButtons));
      }
    }
  }

  // Send the message
  return channel.send({
    content: message,
    embeds: formattedEmbeds,
    components: rows
  });
}

module.exports = sendMessage;
