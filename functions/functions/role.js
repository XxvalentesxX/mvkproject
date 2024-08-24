async function createRole(client, guildId, roleOptions) {
  try {
      const guild = client.guilds.cache.get(guildId);
      if (!guild) {
          throw new Error('Could not find the server with the provided ID.');
      }

      const botMember = guild.members.me;
      if (!botMember) {
          throw new Error('Could not retrieve the bot member in the server.');
      }

      if (!botMember.permissions.has('MANAGE_ROLES')) {
          throw new Error('I need permissions to manage roles.');
      }

      const role = await guild.roles.create({
          name: roleOptions.name,
          color: roleOptions.color,
          mentionable: roleOptions.mentionable,
          hoist: roleOptions.hoist
      });

      console.log(`Role created: ${role.name}`);
      return role;
  } catch (error) {
      console.error('Error creating role:', error.message);
      throw error;
  }
}

function findRole(roleName, guild) {
  const role = guild.roles.cache.find(r => r.name === roleName);
  return role ? role.id : null;
}

function mentionedRoles(message, index = 0) {
  const mentionedRoles = message.mentions.roles;

  if (index >= 0 && index < mentionedRoles.size) {
      return mentionedRoles.at(index).id;
  } else {
      console.error('Index out of range or no roles mentioned.');
      return null;
  }
}
// Export functions
module.exports = { createRole, findRole, mentionedRoles };
