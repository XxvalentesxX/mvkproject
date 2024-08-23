function guildID(client, serverName) {
  const guilds = client.guilds.cache;

  if (serverName) {
    const guild = guilds.find(g => g.name === serverName);
    if (guild) {
      return guild.id;
    } else {
      console.error(`Server not found with the name: ${serverName}`);
    }
  }

  if (guilds.size > 0) {
    return guilds.first().id;
  } else {
    console.error('No servers found.');
    return null;
  }
}

function getMessageContent(message, index) {
  const content = message.content.split(' ');

  if (index !== undefined) {
    if (index >= 0 && index < content.length) {
      return content[index];
    } else {
      console.error('Index out of range.');
      return null;
    }
  }

  return content.join(' ');
}

function stop() {
  throw new Error('Execution stopped by stop().');
}

module.exports = {
  guildID,
  getMessageContent,
  stop
};
