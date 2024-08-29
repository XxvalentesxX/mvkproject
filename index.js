const { startBot } = require("./functions/functions/startBot");
const loadHandler = require('./functions/functions/loadHandler');
const sendMessage = require("./functions/functions/sendMessage");
const alwaysReply = require('./functions/events/alwaysReply');
const banUser = require("./functions/functions/ban");
const { jsonClear, jsonExists, jsonSet, jsonParse, jsonPretty, jsonStringify, jsonUnset, json } = require("./functions/functions/jsonFunctions");
const loadEvents = require('./functions/functions/loadEvents');
const checkContains = require('./functions/functions/checkContains');
const { checkUserPerms } = require('./functions/functions/checkPermissions');
const { guildID, getMessageContent, stop }= require('./functions/functions/functions');
const loop = require('./functions/functions/loop');
const { newCommand } = require('./functions/functions/newCommands');
const { createRole, findRole, mentionedRoles } = require("./functions/functions/role");
const loadSlashCommandsHandler = require("./functions/functions/slashs/loadSlashCommandsHandler");
const { subCommand, newSlashCommand } = require("./functions/functions/slashs/slashCommands");
const embedCreate = require('./functions/functions/embedCreate');
const { setServerVar, getServerVar, setChannelVar, getChannelVar, setUserVar, getUserVar, setVar, getVar, varExists, variableCreate } = require("./functions/functions/variables");
const timeoutUser = require("./functions/functions/timeout");

module.exports = {
    startBot,
    loadHandler,
    sendMessage,
    embedCreate,
    alwaysReply,
    banUser,
    jsonClear,
    jsonExists,
    jsonSet,
    jsonParse,
    jsonPretty,
    jsonStringify,
    jsonUnset,
    json,
    loadEvents,
    checkContains,
    checkUserPerms,
    guildID,
    getMessageContent,
    stop,
    loop,
    createRole,
    findRole,
    mentionedRoles,
    loadSlashCommandsHandler,
    subCommand,
    newSlashCommand,
    setServerVar,
    getServerVar,
    setChannelVar,
    getChannelVar,
    setUserVar,
    getUserVar,
    setVar,
    getVar,
    varExists,
    variableCreate,
    newCommand,
    timeoutUser
};