const { getClient } = require('../client/startBot');

async function banUser({ guild, user, duration, reason }) {
  try {
    const client = getClient();
    if (!client) throw new Error('Cliente no disponible');

    const targetGuild = client.guilds.cache.get(guild);
    if (!targetGuild) throw new Error('Guild no encontrada');

    const member = await targetGuild.members.fetch(user).catch(() => null);
    if (!member) throw new Error('Miembro no encontrado');

    if (!member.bannable) throw new Error('No se puede banear a este miembro');

    await member.ban({ reason });

    if (duration) {
      setTimeout(async () => {
        try {
          await targetGuild.bans.remove(user, 'Duración de ban completada');
        } catch (error) {
          console.error(`Error al intentar desbanear al usuario ${member.user.tag}:`, error.message);
        }
      }, duration * 24 * 60 * 60 * 1000);
    }
  } catch (error) {
    console.error('Error al intentar banear al usuario:', error.message);
  }
}

module.exports = banUser;
