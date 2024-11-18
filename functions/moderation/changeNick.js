const { getClient } = require('../startBot');

async function changeNick({ guild, user, nick }) {
  try {
    const client = getClient();
    if (!client) throw new Error('Cliente no disponible');

    const targetGuild = client.guilds.cache.get(guild);
    if (!targetGuild) throw new Error('Guild no encontrada');

    const member = await targetGuild.members.fetch(user).catch(() => null);
    if (!member) throw new Error('Miembro no encontrado');

    await member.setNickname(nick);

    console.log(`El apodo de ${member.user.tag} ha sido cambiado a: ${nick}`);
  } catch (error) {
    console.error('Error al intentar cambiar el nickname:', error.message);
  }
}

module.exports = changeNick;
