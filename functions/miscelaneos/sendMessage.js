async function sendMessage({ content, embeds = [], ephemeral = false, channel, replyTo = null }) {
  try {
    const messageOptions = {
      content,
      embeds,
      ephemeral
    };

    if (replyTo) {
      const replyMessage = await replyTo.reply(messageOptions);
      return replyMessage.id;
    }

    const sentMessage = await channel.send(messageOptions);
    return sentMessage.id;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}

module.exports = { sendMessage };
