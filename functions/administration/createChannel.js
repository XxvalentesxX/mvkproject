const { ChannelType } = require('discord.js');
const { getClient } = require('../startBot');
const client = getClient();


async function createChannel({ name, type, category = null, topic = null, nsfw = false, guildID }) {
    if (!client || !client.guilds) {
        throw new Error('El cliente no está inicializado o no tiene acceso a los guilds.');
    }

    const guild = client.guilds.cache.get(guildID);
    if (!guild) {
        throw new Error(`No se encontró el guild con ID: ${guildID}`);
    }

    const channelType = {
        text: ChannelType.GuildText,
        voice: ChannelType.GuildVoice,
        forum: ChannelType.GuildForum,
        stage: ChannelType.GuildStageVoice
    }[type];

    if (!channelType) {
        throw new Error('El tipo de canal proporcionado no es válido.');
    }

    try {
        const channel = await guild.channels.create({
            name,
            type: channelType,
            parent: category || undefined,
            topic: topic || undefined,
            nsfw,
        });

        console.log(`Canal creado: ${channel.name} (ID: ${channel.id})`);
        return channel.id;
    } catch (error) {
        console.error('Error al crear el canal:', error);
        throw new Error('Hubo un problema al crear el canal.');
    }
}

module.exports = { createChannel };
