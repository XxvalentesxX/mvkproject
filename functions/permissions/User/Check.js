const { PermissionsBitField } = require('discord.js');
const { getClient } = require('../../client/startBot');

const PERMISSIONS_MAP = {
    "CREATE_INSTANT_INVITE": "CreateInstantInvite",
    "KICK_MEMBERS": "KickMembers",
    "BAN_MEMBERS": "BanMembers",
    "ADMINISTRATOR": "Administrator",
    "MANAGE_CHANNELS": "ManageChannels",
    "MANAGE_GUILD": "ManageGuild",
    "ADD_REACTIONS": "AddReactions",
    "VIEW_AUDIT_LOG": "ViewAuditLog",
    "PRIORITY_SPEAKER": "PrioritySpeaker",
    "STREAM": "Stream",
    "VIEW_CHANNEL": "ViewChannel",
    "SEND_MESSAGES": "SendMessages",
    "SEND_TTS_MESSAGES": "SendTTSMessages",
    "MANAGE_MESSAGES": "ManageMessages",
    "EMBED_LINKS": "EmbedLinks",
    "ATTACH_FILES": "AttachFiles",
    "READ_MESSAGE_HISTORY": "ReadMessageHistory",
    "MENTION_EVERYONE": "MentionEveryone",
    "USE_EXTERNAL_EMOJIS": "UseExternalEmojis",
    "VIEW_GUILD_INSIGHTS": "ViewGuildInsights",
    "CONNECT": "Connect",
    "SPEAK": "Speak",
    "MUTE_MEMBERS": "MuteMembers",
    "DEAFEN_MEMBERS": "DeafenMembers",
    "MOVE_MEMBERS": "MoveMembers",
    "USE_VAD": "UseVAD",
    "CHANGE_NICKNAME": "ChangeNickname",
    "MANAGE_NICKNAMES": "ManageNicknames",
    "MANAGE_ROLES": "ManageRoles",
    "MANAGE_WEBHOOKS": "ManageWebhooks",
    "MANAGE_EMOJIS_AND_STICKERS": "ManageEmojisAndStickers",
    "USE_APPLICATION_COMMANDS": "UseApplicationCommands",
    "REQUEST_TO_SPEAK": "RequestToSpeak",
    "MANAGE_THREADS": "ManageThreads",
    "CREATE_PUBLIC_THREADS": "CreatePublicThreads",
    "CREATE_PRIVATE_THREADS": "CreatePrivateThreads",
    "USE_EXTERNAL_STICKERS": "UseExternalStickers",
    "SEND_MESSAGES_IN_THREADS": "SendMessagesInThreads",
    "USE_EMBEDDED_ACTIVITIES": "UseEmbeddedActivities",
    "MODERATE_MEMBERS": "ModerateMembers"
};

async function checkUserPerms({ user, permissions, guildId }) {
    if (!user || !permissions || !guildId) {
        return console.error('Missing required parameters: user, permissions, or guildId.');
    }

    try {
        const client = getClient();
        if (!client) return console.error('Client not found.');

        const guildObj = client.guilds.cache.get(guildId);
        if (!guildObj) return console.error('Guild not found.');

        const member = await guildObj.members.fetch(user);

        if (!member) {
            return console.error('The user was not found.');
        }

        const hasPermissions = permissions.every(permission => {
            const permissionKey = PERMISSIONS_MAP[permission.toUpperCase()];
            if (!permissionKey) {
                return console.error(`Invalid permission: ${permission}`);
            }
            return member.permissions.has(PermissionsBitField.Flags[permissionKey]);
        });

        return hasPermissions;
    } catch (error) {
        console.error("Error in checkUserPerms:", error);
        return false;
    }
}

module.exports = {
    checkUserPerms
};
