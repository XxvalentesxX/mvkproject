const { Client, EmbedBuilder } = require('discord.js');

// La función ahora asume que el cliente se pasará como argumento
/**
 * Envía un mensaje o embeds a un canal específico.
 * @param {Client} client - Cliente de Discord.
 * @param {Object} options - Opciones para el envío del mensaje.
 * @param {string} options.channel - ID del canal al que enviar el mensaje.
 * @param {string} [options.message] - Mensaje de texto a enviar. Opcional.
 * @param {Array<EmbedBuilder>} [options.embeds] - Array de objetos EmbedBuilder para enviar como embeds. Opcional.
 * @param {Object} [options.ephemeral] - Opciones para mensajes efímeros.
 * @param {boolean} [options.ephemeral.message] - Si el mensaje debe ser efímero.
 * @param {Object} [options.ephemeral.embeds] - Opciones para embeds efímeros.
 * @returns {Promise<Message>} - Mensaje enviado.
 */
async function sendMessage(client, { channel: channelID, embeds, message, ephemeral = {} }) {
  if (!embeds && !message) {
    throw new Error('Debes proporcionar uno de los campos: "embeds" o "message".');
  }

  // Obtener el canal especificado
  const channel = client.channels.cache.get(channelID);

  if (!channel) {
    throw new Error(`No se encontró el canal con ID: ${channelID}`);
  }

  // Verificar los embeds y mensajes efímeros
  if (ephemeral.message || (ephemeral.embeds && Object.values(ephemeral.embeds).includes(true))) {
    if (ephemeral.message) {
      // Si el mensaje es efímero, enviarlo al canal actual
      return channel.send(message);
    }
    if (ephemeral.embeds) {
      const ephemeralEmbeds = embeds.filter((embed, index) => ephemeral.embeds[index]);
      return channel.send({ embeds: ephemeralEmbeds });
    }
  }

  // Enviar embeds o mensaje
  if (embeds && embeds.length > 0) {
    const formattedEmbeds = embeds.map(embed => {
      if (embed instanceof EmbedBuilder) {
        return embed;
      } else {
        throw new Error('Cada elemento en "embeds" debe ser una instancia de EmbedBuilder.');
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
