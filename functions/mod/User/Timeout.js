const { getClient } = require('../../client/startBot'); 

async function timeoutUser({ userId, guildId, time, reason }) {
    try {
        const client = getClient();
        if (!client) {
            return console.error('Discord client is not initialized.');
        }

        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
            return console.error('Unable to find the specified server.');
        }

        const member = await guild.members.fetch(userId).catch(() => null);
        if (!member) {
            return console.error('The specified user was not found.');
        }

        const durationMs = parseTime(time);
        await member.timeout(durationMs, reason);

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

function parseTime(time) {
    const duration = parseInt(time.slice(0, -1));
    const unit = time.slice(-1).toLowerCase();

    switch (unit) {
        case 's': return duration * 1000;
        case 'm': return duration * 60 * 1000;
        case 'h': return duration * 60 * 60 * 1000;
        case 'd': return duration * 24 * 60 * 60 * 1000;
        default: return console.error('Invalid time unit.');
    }
}

module.exports = timeoutUser;
