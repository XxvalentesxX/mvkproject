async function banUser({ userID, reason, duration, guildId }, client) {
  try {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) throw new Error('Guild not found');

    const member = await guild.members.fetch(userID);
    if (!member) throw new Error('Member not found');

    if (!member.bannable) throw new Error('Cannot ban this member');

    await member.ban({ reason });

    if (duration) {
      setTimeout(async () => {
        try {
          await guild.bans.remove(userID);
        } catch (error) {
          console.error('Error while unbanning user:', error);
        }
      }, duration * 24 * 60 * 60 * 1000);
    }
  } catch (error) {
    console.error('Error while banning user:', error);
  }
}

module.exports = banUser;
