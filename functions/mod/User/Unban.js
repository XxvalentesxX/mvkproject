const { getClient } = require('../../client/startBot');

async function unbanUser({ guild, user }) {
    const client = getClient();
    if (!guild || !user) {
        return console.error('The parameters "guild" and "user" are required.');
    }

    try {
        const targetGuild = await client.guilds.fetch(guild);
        if (!targetGuild) {
            return console.error(`No server found with the ID "${guild}".`);
        }

        const banList = await targetGuild.bans.fetch();
        const isBanned = banList.has(user);
        if (!isBanned) {
            return `User with ID ${user} is not banned in the server.`;
        }

        await targetGuild.bans.remove(user);
        return `User with ID ${user} has been successfully unbanned.`;
    } catch (error) {
        console.error(`Error while trying to unban the user: ${error.message}`);
        return console.error('Could not unban the user. Please check the parameters and permissions.');
    }
}

module.exports = unbanUser;
