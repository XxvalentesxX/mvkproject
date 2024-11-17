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
      // Verificamos que el bot tenga permisos para gestionar roles
      if (!guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        throw new Error('No tengo permisos para gestionar roles.');
      }
  
      // Verificamos si el bot no puede quitar el rol debido a la jerarquía
      if (guild.me.roles.highest.position <= roleToRemove.position) {
        throw new Error('Mi rol es más bajo que el rol que intento quitar.');
      }
  
      // Quitamos el rol
      await member.roles.remove(roleToRemove);
      return `Rol ${roleToRemove.name} quitado correctamente al usuario ${member.user.tag}.`;
    } catch (error) {
      console.error(error);
      throw new Error('Hubo un error al intentar quitar el rol.');
    }
  }
  