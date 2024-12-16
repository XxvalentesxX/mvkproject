const { getClient } = require('../../client/startBot');

async function changeNick({ guild, user, nick }) {
  try {
    const client = getClient();
    if (!client) return console.error('Client not available');

    const targetGuild = client.guilds.cache.get(guild);
    if (!targetGuild) return console.error('Guild not found');

    const member = await targetGuild.members.fetch(user).catch(() => null);
    if (!member) return console.error('Member not found');

    await member.setNickname(nick);

    console.log(`The nickname of ${member.user.tag} has been changed to: ${nick}`);
  } catch (error) {
    console.error('Error while trying to change the nickname:', error.message);
  }
}

module.exports = changeNick;
