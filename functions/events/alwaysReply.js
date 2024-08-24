function alwaysReply({ action }) {
    return (client) => {
      client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
  
        try {
          await action(message);
        } catch (error) {
          console.error('Error in alwaysReply action:', error);
        }
      });
    };
  }
  
  module.exports = alwaysReply;
  