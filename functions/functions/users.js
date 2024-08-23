/**
 * Obtiene el nombre de usuario del autor o de un usuario por ID.
 * @param {object} message - El objeto del mensaje de Discord.
 * @param {string} [userId] - Opcional, el ID del usuario del cual obtener el nombre.
 * @returns {string} - El nombre de usuario.
 */
function username(message, userId) {
  // Si se proporciona un ID de usuario
  if (userId) {
    const user = message.client.users.cache.get(userId); // Obtiene el usuario por ID
    return user ? user.username : 'Desconocido'; // Devuelve el nombre de usuario o 'Desconocido' si no se encuentra
  }

  // Si no se proporciona un ID, devuelve el nombre de usuario del autor del mensaje
  return message.author.username;
}

/**
 * Obtiene el apodo del autor o de un usuario por ID.
 * @param {object} message - El objeto del mensaje de Discord.
 * @param {string} [userId] - Opcional, el ID del usuario del cual obtener el apodo.
 * @returns {string} - El apodo del usuario.
 */
function nickname(message, userId) {
  // Si se proporciona un ID de usuario
  if (userId) {
    const guild = message.guild;
    if (!guild) return 'El usuario no existe'; // Si el mensaje no proviene de un servidor

    const member = guild.members.cache.get(userId);
    return member ? (member.nickname || member.user.username) : 'El usuario no existe';
  }

  // Si no se proporciona un ID, devuelve el apodo del autor del mensaje
  const member = message.guild?.members.cache.get(message.author.id);
  return member ? (member.nickname || member.user.username) : 'El usuario no existe';
}

/**
 * Obtiene el ID del autor del mensaje.
 * @param {object} message - El objeto del mensaje de Discord.
 * @returns {string} - El ID del autor del mensaje.
 */
function authorID(message) {
  return message.author.id;
}

module.exports = { username, nickname, authorID };
