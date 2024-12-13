const { getClient } = require('../startBot');

async function createChannel({ guild, type, name, parent, topic = null, nsfw = false }) {
    try {
        const client = getClient();

        if (!client) {
            throw new Error('The client is not available');
        }

        const guildInstance = await client.guilds.fetch(guild);
        if (!guildInstance) {
            throw new Error('Guild not found');
        }

        const typeMapping = {
            'text': 0,
            'voice': 2,
            'category': 4,
            'forum': 15
        };

        const channelType = typeMapping[type.toLowerCase()];
        if (channelType === undefined) {
            throw new Error('Invalid channel type. Use "text", "voice", "category", or "forum".');
        }

        const channelOptions = {
            name,
            type: channelType,
            parent,
            topic,
            nsfw,
        };

        const newChannel = await guildInstance.channels.create(channelOptions);

        return newChannel;
    } catch (error) {
        console.error('Error creating the channel:', error);
        return null;
    }
}

module.exports = { createChannel };
