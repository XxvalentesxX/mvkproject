const { PermissionsBitField } = require('discord.js');

async function removeRole({ user, role, guild }) {
  const member = await guild.members.fetch(user);

  if (!member) {
    return console.error('Member not found.');
  }

  const roleToRemove = guild.roles.cache.get(role);
  if (!roleToRemove) {
    return console.error('Role not found.');
  }

  try {
    const botMember = guild.members.me;

    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return console.error('I do not have permission to manage roles.');
    }

    if (botMember.roles.highest.position <= roleToRemove.position) {
      return console.error('My role is lower than the role I am trying to remove.');
    }

    await member.roles.remove(roleToRemove);
    return `Role ${roleToRemove.name} successfully removed from user ${member.user.tag}.`;
  } catch (error) {
    console.error(error);
    return console.error('An error occurred while trying to remove the role.');
  }
}

module.exports = removeRole;
