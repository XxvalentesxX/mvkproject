const { startBot, getClient } = require("./functions/startBot");
const loadCommands = require('./functions/handlers/loadCommands');
const sendMessage = require("./functions/functions/sendMessage");
const alwaysReply = require('./functions/events/alwaysReply');
const banUser = require("./functions/moderation/ban");
const { jsonClear, jsonExists, jsonSet, jsonParse, jsonPretty, jsonStringify, jsonUnset, json } = require("./functions/utils/jsonFunctions");
const loadEvents = require('./functions/handlers/loadEvents');
const checkContains = require('./functions/utils/checkContains');
const { checkUserPerms } = require('./functions/utils/checkPermissions');
const { guildID, getMessageContent, stop }= require('./functions/functions/functions');
const loop = require('./functions/functions/loop');
const { newCommand } = require('./functions/manage_commands/newCommands');
const { createRole, findRole, mentionedRoles } = require("./functions/functions/role");
const loadSlashs = require("./functions/handlers/loadSlashs");
const { subCommand, newSlashCommand, slashOption } = require("./functions/manage_commands/slashCommands");
const embedCreate = require('./functions/utils/embedCreate');
const { setServerVar, getServerVar, setChannelVar, getChannelVar, setUserVar, getUserVar, setVar, getVar, varExists, variableCreate } = require("./functions/functions/variables");
const timeoutUser = require("./functions/moderation/timeout");
const { addButtonInteraction, createButton } = require("./functions/components/buttons");
const { splitText, textSplit, getTextSplitLength } = require("./functions/utils/splits");

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