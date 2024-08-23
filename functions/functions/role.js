// role.js

/**
 * Crea un nuevo rol en el servidor especificado.
 * @param {Object} client - El cliente de Discord.
 * @param {string} guildId - ID del servidor donde crear el rol.
 * @param {Object} roleOptions - Opciones para el nuevo rol.
 * @param {string} roleOptions.name - Nombre del rol.
 * @param {string} roleOptions.color - Color del rol en formato hexadecimal.
 * @param {boolean} roleOptions.mentionable - Indica si el rol es mencionable.
 * @param {boolean} roleOptions.hoist - Indica si el rol debe ser elevado en la lista de roles.
 * @returns {Promise<Role>} - El rol creado.
 */
async function createRole(client, guildId, roleOptions) {
    try {
      // Obtén el servidor usando el ID
      const guild = client.guilds.cache.get(guildId);
      if (!guild) {
        throw new Error('No se pudo encontrar el servidor con el ID proporcionado.');
      }
  
      // Verifica si el bot tiene permiso para gestionar roles
      const botMember = guild.members.me; // Miembro del bot en el servidor
      if (!botMember) {
        throw new Error('No se pudo obtener el miembro del bot en el servidor.');
      }
  
      if (!botMember.permissions.has('MANAGE_ROLES')) {
        throw new Error('Necesito permisos para gestionar roles.');
      }
  
      // Crea el rol
      const role = await guild.roles.create({
        name: roleOptions.name,
        color: roleOptions.color,
        mentionable: roleOptions.mentionable,
        hoist: roleOptions.hoist
      });
  
      console.log(`Rol creado: ${role.name}`);
      return role; // Retorna el rol creado para posibles futuros usos
    } catch (error) {
      console.error('Error al crear el rol:', error.message);
      throw error; // Lanza el error para que pueda ser manejado fuera de esta función
    }
  }
  
  /**
   * Encuentra un rol por su nombre.
   * @param {string} roleName - El nombre del rol a buscar.
   * @param {Guild} guild - La guild en la que buscar el rol.
   * @returns {string|null} - La ID del rol si se encuentra, de lo contrario, null.
   */
  function findRole(roleName, guild) {
    // Busca el rol en la guild por nombre
    const role = guild.roles.cache.find(r => r.name === roleName);
    
    // Devuelve la ID del rol si se encuentra, de lo contrario, null
    return role ? role.id : null;
  }
  
  /**
   * Obtiene un rol mencionado en un mensaje basado en un índice.
   * @param {Object} message - El mensaje de Discord.
   * @param {number} [index=0] - El índice del rol mencionado a obtener. Por defecto es 0.
   * @returns {string|null} - La ID del rol mencionado si se encuentra, de lo contrario, null.
   */
  function mentionedRoles(message, index = 0) {
    // Obtén las menciones de roles del mensaje
    const mentionedRoles = message.mentions.roles;
  
    // Verifica si el índice es válido
    if (index >= 0 && index < mentionedRoles.size) {
      // Devuelve la ID del rol mencionado en el índice especificado
      return mentionedRoles.at(index).id;
    } else {
      console.error('Índice fuera de rango o no se mencionaron roles.');
      return null;
    }
  }
  
  module.exports = { createRole, findRole, mentionedRoles };
  