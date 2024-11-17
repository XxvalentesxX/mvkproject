const { PermissionsBitField } = require('discord.js');

async function addRole({ user, role, guild }) {
  const member = await guild.members.fetch(user);
  
  if (!member) {
    throw new Error('Miembro no encontrado.');
  }

  const roleToAdd = guild.roles.cache.get(role);
  if (!roleToAdd) {
    throw new Error('Rol no encontrado.');
  }

  try {
    // Verificamos que el bot tenga permisos para gestionar roles
    const botMember = guild.members.me; // Cambio de guild.me a guild.members.me
    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      throw new Error('No tengo permisos para gestionar roles.');
    }

    // Verificamos si el bot no puede asignar el rol debido a la jerarquía
    if (botMember.roles.highest.position <= roleToAdd.position) {
      throw new Error('Mi rol es más bajo que el rol que intento asignar.');
    }

    // Asignamos el rol
    await member.roles.add(roleToAdd);
    return `Rol ${roleToAdd.name} asignado correctamente al usuario ${member.user.tag}.`;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al intentar asignar el rol.');
  }
}

module.exports = addRole;
