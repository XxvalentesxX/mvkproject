const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, InteractionType, DiscordAPIError } = require('discord.js');

async function sendMessage({ channel, message = '', embeds = [], components = {}, ephemeral = {} }) {
  if (!channel) {
    throw new Error('Channel must be provided.');
  }

  if (typeof channel.send !== 'function') {
    throw new Error('The provided channel is not a valid Discord channel.');
  }

  if (ephemeral.message || (ephemeral.embeds && Object.values(ephemeral.embeds).includes(true))) {
    if (ephemeral.message) {
      return channel.send({ content: message });
    }

    if (ephemeral.embeds) {
      const ephemeralEmbeds = embeds.filter((embed, index) => ephemeral.embeds[index]);
      return channel.send({ embeds: ephemeralEmbeds });
    }
  }

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

  const actionRows = [];
  if (components.buttons && components.buttons.length > 0) {
    const row = new ActionRowBuilder();
    components.buttons.forEach(button => {
      if (button instanceof ButtonBuilder) {
        row.addComponents(button);
      } else {
        throw new Error('Each item in "components.buttons" must be an instance of ButtonBuilder.');
      }
    });
    actionRows.push(row);
  }

  try {
    await channel.send({
      content: message,
      embeds: formattedEmbeds,
      components: actionRows.length > 0 ? actionRows : undefined
    });
  } catch (error) {
    if (error instanceof DiscordAPIError) {
      switch (error.code) {
        case 10062:
          console.warn('Interaction is unknown or expired.');
          break;
        case 40060:
          console.warn('Interaction has already been acknowledged.');
          break;
        default:
          console.error('Discord API Error:', error);
      }
    } else {
      console.error('General Error:', error);
    }
  }
}

module.exports = sendMessage;
