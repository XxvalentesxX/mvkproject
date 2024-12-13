const { getClient } = require('../../client/startBot');

async function unbanUser({ guild, user }) {
    const client = getClient();
    if (!guild || !user) {
      throw new Error('Se requieren los parámetros "guild" e "user".');
    }
  
    try {
      const targetGuild = await client.guilds.fetch(guild);
      if (!targetGuild) {
        throw new Error(`No se encontró el servidor con el ID "${guild}".`);
      }
  
      const banList = await targetGuild.bans.fetch();
      const isBanned = banList.has(user);
      if (!isBanned) {
        return `El usuario con ID ${user} no está baneado en el servidor.`;
      }
  
      await targetGuild.bans.remove(user);
      return `El usuario con ID ${user} ha sido desbaneado correctamente.`;
    } catch (error) {
      console.error(`Error al intentar desbanear al usuario: ${error.message}`);
      throw new Error('No se pudo desbanear al usuario. Verifica los parámetros y permisos.');
    }
  }
  
  module.exports = unbanUser;
  