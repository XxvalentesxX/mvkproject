const { getClient } = require('../client/startBot');

async function addReactions({ message, reactions }) {
  try {
    const client = getClient();
    if (!client) throw new Error('Cliente no disponible');

    const targetMessage = await client.channels.cache
      .get(message.channelId)
      .messages.fetch(message.id);

    if (!targetMessage) throw new Error('Mensaje no encontrado');

    for (const reaction of reactions) {
      await targetMessage.react(reaction);
    }

  } catch (error) {
    console.error('Error al agregar reacciones:', error.message);
  }
}

module.exports = addReactions;
