const { getClient } = require('../startBot');

async function banUser({ guild, user, duration, reason }) {
  try {
    const client = getClient();
    if (!client) throw new Error('Cliente no disponible');

    const targetGuild = client.guilds.cache.get(guild);
    if (!targetGuild) throw new Error('Guild no encontrada');

    const member = await targetGuild.members.fetch(user).catch(() => null);
    if (!member) throw new Error('Miembro no encontrado');

    if (!member.bannable) throw new Error('No se puede banear a este miembro');

    if (duration) {
      setTimeout(async () => {
        try {
          await targetGuild.bans.remove(user, 'Duración de ban completada');
        } catch (error) {
          console.error('Hubo un error al desbanear el usuario.')
        }
      }, duration * 24 * 60 * 60 * 1000);
    }
  } catch (error) {
    console.error('Ha ocurrido un error.')
  }
}

module.exports = banUser;
