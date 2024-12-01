async function sendMessage({ content, embeds = [], ephemeral = false, channel, components = [], replyTo = null, interaction = null }) {
  try {
    const messageOptions = {
      content,
      embeds,
      components,
    };

    if (interaction) {
      if (ephemeral) messageOptions.ephemeral = true;
      const replyMessage = await interaction.reply({ ...messageOptions, fetchReply: !ephemeral });
      return replyMessage.id;
    }

    if (replyTo) {
      const replyMessage = await replyTo.reply(messageOptions);
      return replyMessage.id;
    }

    const sentMessage = await channel.send(messageOptions);
    return sentMessage.id;
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

module.exports = { sendMessage };
