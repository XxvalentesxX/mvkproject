const { getClient } = require('../client/startBot');

async function addReactions({ message, reactions }) {
  try {
    const client = getClient();
    if (!client) return console.error('Client not available');

    const targetMessage = await client.channels.cache
      .get(message.channelId)
      .messages.fetch(message.id);

    if (!targetMessage) return console.error('Message not found');

    for (const reaction of reactions) {
      await targetMessage.react(reaction);
    }

  } catch (error) {
    console.error('Error while adding reactions:', error.message);
  }
}

module.exports = addReactions;
