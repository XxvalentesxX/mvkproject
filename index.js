const embedCreate = require("./functions/functions/embedCreate");
const { guildID, getMessageContent, stop } = require("./functions/functions/functions");
const loadEvents = require("./functions/functions/loadEvents");
const loadHandler = require("./functions/functions/loadHandler");
const { newCommand } = require("./functions/functions/newCommands");
const { mentionedRoles, findRole, createRole } = require("./functions/functions/role");
const { sendMessage } = require("./functions/functions/sendMessage");
const startBot = require("./functions/functions/startBot");
const { username, nickname, authorID } = require("./functions/functions/users");
const { setUserVar, setServerVar, setChannelVar, varExists, setVar, variableCreate, getServerVar, getChannelVar, getVar, getUserVar } = require("./functions/functions/variables");
const loop = require('./functions/functions/loop');
const { GatewayIntentBits, Client } = require("discord.js");
const loadSlashCommandsHandler = require("./functions/functions/slashs/loadSlashCommandsHandler");
const { newSlashCommand, subCommand } = require("./functions/functions/slashs/slashCommands");
const banUser = require('./functions/functions/ban');
const { checkUserPerms } = require("./functions/functions/checkPermissions");
const setActivity = require('./functions/functions/setActivity')

module.exports = {
    newCommand,
    loadHandler,
    loadEvents,
    startBot,
    guildID,
    mentionedRoles,
    findRole,
    createRole,
    username,
    nickname,
    authorID,
    setUserVar,
    setServerVar,
    setChannelVar,
    varExists,
    setVar,
    variableCreate,
    getServerVar,
    getChannelVar,
    getVar,
    getUserVar,
    embedCreate,
    sendMessage,
    loop,
    stop,
    getMessageContent,
    GatewayIntentBits,
    Client,
    newSlashCommand,
    subCommand,
    loadSlashCommandsHandler,
    banUser,
    sendMessage,
    checkUserPerms,
    setActivity
};
