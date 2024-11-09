const { ChannelType, PermissionsBitField } = require('discord.js'); // Asegúrate de incluir el módulo necesario
const { getClient } = require('../startBot');
const client = getClient();

const CHANNEL_TYPE_OBJECT = {
    'text': ChannelType.GuildText,
    'voice': ChannelType.GuildVoice,
    'category': ChannelType.GuildCategory,
    'thread': ChannelType.PublicThread,
};

async function create(options) {
    const { type, guild, name, channelType, channelCategory, permissions, topic, nsfw, hoisted, mentionable, color, image, duration, limit, webhookName, webhookChannel, webhookUrl } = options;
    
    const guildObj = client.guilds.cache.get(guild); // Asegúrate de que el cliente tenga acceso a los guilds

    if (!guildObj) {
        throw new Error('Guild not found');
    }

    switch (type) {
        case 'channel':
            const channelTypeValue = CHANNEL_TYPE_OBJECT[channelType];
            if (!channelTypeValue) throw new Error('Invalid channel type');

            const channel = await guildObj.channels.create({
                name,
                type: channelTypeValue,
                parent: channelCategory || null,
                topic: topic || null,
                nsfw: nsfw || false,
                permissionOverwrites: permissions ? permissions.map(p => ({
                    id: p.id,
                    allow: new PermissionsBitField(p.allow).toArray(),
                    deny: new PermissionsBitField(p.deny).toArray()
                })) : []
            });
            return channel.id;

        case 'role':
            const role = await guildObj.roles.create({
                name,
                hoist: hoisted || false,
                mentionable: mentionable || false,
                color: color || '#000000',
                permissions: permissions ? new PermissionsBitField(permissions).toArray() : [],
            });
            return role.id;

        case 'emoji':
            const emoji = await guildObj.emojis.create(image, name);
            return emoji.id;

        case 'invite':
            const invite = await guildObj.invites.create({
                maxAge: duration || 0,
                maxUses: limit || 0,
            });
            return invite.url;

        case 'webhook':
            const channelObj = guildObj.channels.cache.find(ch => ch.name === webhookChannel);
            if (!channelObj) throw new Error('Channel not found');

            const webhook = await channelObj.createWebhook({
                name: webhookName,
                avatar: webhookUrl || null,
            });
            return webhook.url;

        default:
            throw new Error('Invalid type');
    }
}

module.exports = { create };
