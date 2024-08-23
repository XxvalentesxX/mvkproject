/**
 * Banea a un usuario del servidor.
 * @param {Object} options - Opciones para el baneo.
 * @param {string} options.userID - ID del usuario a banear.
 * @param {string} options.reason - Razón del baneo.
 * @param {number} [options.duration] - Duración en días para el baneo temporal (opcional).
 * @param {string} options.guildId - ID del servidor donde se realizará el baneo.
 * @param {Client} client - El cliente de Discord.
 */
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
  