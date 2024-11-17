const { ChannelType } = require('discord.js');
const { getClient } = require('../startBot');
const client = getClient(); // Se asegura de obtener el cliente de Discord


async function createChannel({ name, type, category = null, topic = null, nsfw = false, guildID }) {
    if (!client || !client.guilds) {
        throw new Error('El cliente no está inicializado o no tiene acceso a los guilds.');
    }

    const guild = client.guilds.cache.get(guildID);
    if (!guild) {
        throw new Error(`No se encontró el guild con ID: ${guildID}`);
    }

    // Asegúrate de usar los valores correctos de ChannelType
    const channelType = {
        text: ChannelType.GuildText,      // Canal de texto
        voice: ChannelType.GuildVoice,    // Canal de voz
        forum: ChannelType.GuildForum,    // Canal de foro
        stage: ChannelType.GuildStageVoice // Canal de voz en escenario
    }[type];

    if (!channelType) {
        throw new Error('El tipo de canal proporcionado no es válido.');
    }

    try {
        const channel = await guild.channels.create({
            name,
            type: channelType,    // Asignar el tipo de canal correcto
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
