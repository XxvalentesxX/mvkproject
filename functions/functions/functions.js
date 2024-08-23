// functions.js

/**
 * Devuelve el ID del servidor actual o busca un servidor por nombre.
 * @param {Object} client - El cliente de Discord.
 * @param {string} [serverName] - Nombre del servidor para buscar.
 * @returns {string} - ID del servidor encontrado o del servidor actual si no se proporciona nombre.
 */
function guildID(client, serverName) {
  // Obtener todos los servidores del cliente
  const guilds = client.guilds.cache;

  if (serverName) {
    // Buscar el servidor por nombre
    const guild = guilds.find(g => g.name === serverName);
    if (guild) {
      return guild.id; // Devuelve el ID del servidor encontrado
    } else {
      console.error(`No se encontró el servidor con el nombre: ${serverName}`);
    }
  }

  // Si no se proporciona nombre o no se encuentra el servidor, devuelve el ID del primer servidor
  if (guilds.size > 0) {
    return guilds.first().id;
  } else {
    console.error('No se encontraron servidores.');
    return null; // O puedes devolver un valor por defecto
  }
}

/**
 * Devuelve el contenido de un mensaje o una palabra específica del mensaje según el índice proporcionado.
 * @param {Object} message - El objeto del mensaje.
 * @param {number} [index] - El índice de la palabra a devolver. Si no se proporciona, se devuelve todo el mensaje.
 * @returns {string} - La palabra en el índice dado o el contenido completo del mensaje si no se proporciona un índice.
 */
function getMessageContent(message, index) {
  const content = message.content.split(' ');

  if (index !== undefined) {
    // Verifica si el índice es válido
    if (index >= 0 && index < content.length) {
      return content[index];
    } else {
      console.error('Índice fuera de rango.');
      return null;
    }
  }

  // Devuelve el contenido completo del mensaje si no se proporciona un índice
  return content.join(' ');
}

/**
 * Detiene la ejecución del código levantando un error controlado.
 * @throws {Error} - Error para detener la ejecución.
 */
function stop() {
  throw new Error('Ejecución detenida por stop().');
}

module.exports = {
  guildID,
  getMessageContent,
  stop
};
