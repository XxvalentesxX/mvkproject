const { getClient } = require('../../client/startBot');

async function banUser({ guild, user, duration, reason }) {
  try {
    const client = getClient();
    if (!client) return console.error('Client not available');

    const targetGuild = client.guilds.cache.get(guild);
    if (!targetGuild) return console.error('Guild not found');

    const member = await targetGuild.members.fetch(user).catch(() => null);
    if (!member) return console.error('Member not found');

    if (!member.bannable) return console.error('Cannot ban this member');

    await member.ban({ reason });

    if (duration) {
      setTimeout(async () => {
        try {
          await targetGuild.bans.remove(user, 'Ban duration completed');
        } catch (error) {
          console.error(`Error while trying to unban user ${member.user.tag}:`, error.message);
        }
      }, duration * 24 * 60 * 60 * 1000);
    }
  } catch (error) {
    console.error('Error while trying to ban the user:', error.message);
  }
}

module.exports = banUser;
