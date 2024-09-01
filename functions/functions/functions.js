function getMessageContent(message, index) {
  const content = message.content.split(' ');

  if (index !== undefined) {
    if (index >= 0 && index < content.length - 1) {
      return content[index + 1];
    } else {
      console.error('Index out of range.');
      return null;
    }
  }

  return content.slice(1).join(' ');
}

function stop() {
  return;
}

module.exports = {
  getMessageContent,
  stop
};
