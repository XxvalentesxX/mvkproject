const { PermissionsBitField } = require('discord.js');

async function addRole({ user, role, guild }) {
  const member = await guild.members.fetch(user);
  
  if (!member) {
    return console.error('Member not found.');
  }

  const roleToAdd = guild.roles.cache.get(role);
  if (!roleToAdd) {
    return console.error('Role not found.');
  }

  try {
    const botMember = guild.members.me;
    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return console.error('I do not have permission to manage roles.');
    }

    if (botMember.roles.highest.position <= roleToAdd.position) {
      return console.error('My role is lower than the role I am trying to assign.');
    }

    await member.roles.add(roleToAdd);
    return `Role ${roleToAdd.name} successfully assigned to user ${member.user.tag}.`;
  } catch (error) {
    console.error(error);
    return console.error('An error occurred while trying to assign the role.');
  }
}

module.exports = addRole;
