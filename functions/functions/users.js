function username(message, userId) {
  if (userId) {
    const user = message.client.users.cache.get(userId);
    return user ? user.username : 'Unknown';
  }
  return message.author.username;
}

function nickname(message, userId) {
  if (userId) {
    const guild = message.guild;
    if (!guild) return 'User does not exist';

    const member = guild.members.cache.get(userId);
    return member ? (member.nickname || member.user.username) : 'User does not exist';
  }

  const member = message.guild?.members.cache.get(message.author.id);
  return member ? (member.nickname || member.user.username) : 'User does not exist';
}

function authorID(message) {
  return message.author.id;
}

module.exports = { username, nickname, authorID };
