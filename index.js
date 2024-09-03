const { startBot, getClient } = require("./functions/functions/startBot");
const loadCommands = require('./functions/functions/loadCommands');
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
const loadSlashs = require("./functions/functions/slashs/loadSlashs");
const { subCommand, newSlashCommand, slashOption } = require("./functions/functions/slashs/slashCommands");
const embedCreate = require('./functions/functions/embedCreate');
const { setServerVar, getServerVar, setChannelVar, getChannelVar, setUserVar, getUserVar, setVar, getVar, varExists, variableCreate } = require("./functions/functions/variables");
const timeoutUser = require("./functions/functions/timeout");
const { addButtonInteraction, createButton } = require("./functions/functions/components/buttons");
const { splitText, textSplit, getTextSplitLength } = require("./functions/functions/splits");

module.exports = {
    startBot,
    loadCommands,
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
    loadSlashs,
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
    timeoutUser,
    createButton,
    addButtonInteraction,
    splitText,
    textSplit,
    getTextSplitLength,
    getClient,
    slashOption
};