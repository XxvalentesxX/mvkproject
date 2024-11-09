const { startBot, getClient } = require("./functions/startBot");
const loadCommands = require('./functions/handlers/loadCommands');
const sendMessage = require("./functions/miscelaneos/sendMessage");
const banUser = require("./functions/moderation/ban");
const { jsonClear, jsonExists, jsonSet, jsonParse, jsonPretty, jsonStringify, jsonUnset, json } = require("./functions/utils/jsonFunctions");
const loadEvents = require('./functions/handlers/loadEvents');
const checkContains = require('./functions/utils/checkContains');
const { checkUserPerms } = require('./functions/utils/checkPermissions');
const { getMessageContent, stop }= require('./functions/utils/stopAndMessage');
const loop = require('./functions/utils/loop');
const { newCommand } = require('./functions/manage_commands/newCommands');
const loadSlashs = require("./functions/handlers/loadSlashs");
const { subCommand, newSlashCommand, slashOption } = require("./functions/manage_commands/slashCommands");
const embedCreate = require('./functions/utils/embedCreate');
const { setServerVar, getServerVar, setChannelVar, getChannelVar, setUserVar, getUserVar, setVar, getVar, varExists, variableCreate } = require("./functions/miscelaneos/variables");
const timeoutUser = require("./functions/moderation/timeout");
const { addButtonInteraction, createButton } = require("./functions/components/buttons");
const { splitText, textSplit, getTextSplitLength } = require("./functions/utils/splits");
const { newEvent } = require("./functions/manage_commands/newEvents");
const { create } = require("./functions/administration/create");

module.exports = {
    startBot,
    loadCommands,
    sendMessage,
    embedCreate,
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
    getMessageContent,
    stop,
    loop,
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
    slashOption,
    newEvent,
    create
};