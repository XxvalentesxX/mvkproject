const loadCommands = require('./functions/handlers/loadCommands');
const { newCommand } = require('./functions/manage_commands/newCommand');
const { startBot, getClient } = require('./functions/startBot');
const embedCreate = require('./functions/utils/embedCreate');
const sendMessage = require('./functions/miscelaneos/sendMessage');

module.exports = {
    loadCommands,
    newCommand,
    startBot,
    getClient,
    embedCreate,
    sendMessage
}