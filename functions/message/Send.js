async function sendMessage({ content, embeds = [], ephemeral = false, channel, components = [], replyTo = null, interaction = null }) {
  try {
    const messageOptions = {
      content,
      embeds,
      components,
    };

    if (interaction) {
      if (ephemeral) messageOptions.ephemeral = true;

      if (!interaction.replied) {
        const replyMessage = await interaction.reply({ ...messageOptions, fetchReply: !ephemeral });
        return replyMessage;
      } else {
        console.log('La interacción ya ha sido respondida');
        const followUpMessage = await interaction.followUp({ ...messageOptions, fetchReply: !ephemeral });
        return followUpMessage;
      }
    }

    if (replyTo) {
      const replyMessage = await replyTo.reply(messageOptions);
      return replyMessage;
    }

    const sentMessage = await channel.send(messageOptions);
    return sentMessage;
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

module.exports = { sendMessage };
