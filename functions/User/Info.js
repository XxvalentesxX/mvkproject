const { getClient } = require('../client/startBot');

async function userinfo(userId, guildId = null) {
    const client = getClient();
    if (!client || !client.isReady()) {
        console.error('El cliente no está inicializado o no está listo.');
        return { error: 'El cliente no está inicializado o no está listo.' };
    }

    try {
        const user = await client.users.fetch(userId);
        if (!user) throw new Error('Usuario no encontrado');

        const presence = user.presence || null;
        const globalStatus = presence ? presence.status : 'offline';

        const globalData = {
            username: user.username,
            nickname: { global: user.globalName || null, server: null },
            createdAt: Math.floor(user.createdAt.getTime() / 1000),
            avatar: user.avatar || null,
            avatarURL: user.displayAvatarURL({ dynamic: true, size: 1024 }),
            banner: user.banner || null,
            bannerURL: user.bannerURL({ dynamic: true, size: 1024 }),
            badges: user.flags ? user.flags.toArray() : [],
            activities: presence?.activities?.map(activity => activity.name) || [],
            status: globalStatus
        };

        if (!guildId) return globalData;

        const guild = await client.guilds.fetch(guildId);
        if (!guild) throw new Error('Servidor no encontrado');

        const member = await guild.members.fetch(userId);
        if (!member) throw new Error('El usuario no es miembro de este servidor');

        const serverData = {
            nickname: { global: globalData.nickname.global, server: member.nickname || globalData.nickname.global },
            joinedAt: Math.floor(member.joinedAt.getTime() / 1000),
            roles: member.roles.cache.map(role => role.id)
        };

        return { ...globalData, ...serverData };
    } catch (error) {
        console.error('Error en userinfo:', error);
        return { error: error.message };
    }
}

module.exports = userinfo;
