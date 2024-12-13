const { PermissionsBitField } = require('discord.js');

async function removeRole({ user, role, guild }) {
  const member = await guild.members.fetch(user);

  if (!member) {
    throw new Error('Miembro no encontrado.');
  }

  const roleToRemove = guild.roles.cache.get(role);
  if (!roleToRemove) {
    throw new Error('Rol no encontrado.');
  }

  try {
    const botMember = guild.members.me;

    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      throw new Error('No tengo permisos para gestionar roles.');
    }

    if (botMember.roles.highest.position <= roleToRemove.position) {
      throw new Error('Mi rol es más bajo que el rol que intento quitar.');
    }

    await member.roles.remove(roleToRemove);
    return `Rol ${roleToRemove.name} quitado correctamente al usuario ${member.user.tag}.`;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al intentar quitar el rol.');
  }
}

module.exports = removeRole;
