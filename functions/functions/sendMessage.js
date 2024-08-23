const { Client, EmbedBuilder } = require('discord.js');

async function sendMessage(client, { channel: channelID, embeds, message, ephemeral = {} }) {
  if (!embeds && !message) {
    throw new Error('You must provide one of the fields: "embeds" or "message".');
  }

  const channel = client.channels.cache.get(channelID);

  if (!channel) {
    throw new Error(`Channel with ID: ${channelID} not found.`);
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

module.exports = {
  sendMessage
};
