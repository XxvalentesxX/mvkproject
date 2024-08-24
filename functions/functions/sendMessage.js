const { EmbedBuilder } = require('discord.js');

async function sendMessage({ channel, embeds, message, ephemeral = {} }) {
  if (!channel) {
    throw new Error('Channel must be provided.');
  }

  if (typeof channel.send !== 'function') {
    throw new Error('The provided channel is not a valid Discord channel.');
  }

  if (ephemeral.message || (ephemeral.embeds && Object.values(ephemeral.embeds).includes(true))) {
    if (ephemeral.message) {
      return channel.send(message);
    }
    if (ephemeral.embeds) {
      const ephemeralEmbeds = embeds.filter((embed, index) => ephemeral.embeds[index]);
      return channel.send({ embeds: ephemeralEmbeds });
    }
  }

  if (embeds && embeds.length > 0) {
    const formattedEmbeds = embeds.map(embed => {
      if (embed instanceof EmbedBuilder) {
        return embed;
      } else {
        throw new Error('Each item in "embeds" must be an instance of EmbedBuilder.');
      }
    });
    return channel.send({ embeds: formattedEmbeds });
  }

  if (message) {
    return channel.send(message);
  }
}

module.exports = sendMessage;
