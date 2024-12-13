const { sendMessage } = require("./functions/message/Message");
const banUser = require("./functions/mod/banUser");
const checkContains = require('./functions/message/checkContains');
const { checkUserPerms } = require('./functions/permissions/checkPermissions');
const loop = require('./functions/misc/loop');
const { newCommand } = require('./functions/handlers/add-ons/SetCommand');
const { subCommand, newSlashCommand, slashOption } = require("./functions/handlers/add-ons/SetSlashCommand");
const embedCreate = require('./functions/message/Embed');
const timeoutUser = require("./functions/mod/timeout");
const { splitText, textSplit, getTextSplitLength } = require("./functions/message/Split");
const { newEvent } = require("./functions/handlers/add-ons/SetEvent");
const { createChannel } = require("./functions/admin/createChannel");
const { startBot } = require('./functions/client/startBot');
const addRole = require('./functions/admin/Role');
const removeRole = require('./functions/admin/removeRole');
const changeNick = require('./functions/mod/changeNick');
const addReactions = require('./functions/message/Reactions');
const unbanUser = require('./functions/mod/unbanUser');
const setPresence = require('./functions/client/setPresence');

const Var = require('./functions/misc/variables');
const Load = require('./functions/handlers/loader/Load');
const { Buttons } = require("./functions/message/Components/Buttons");
const { Menus } = require("./functions/message/Components/Menus");

module.exports = {
    sendMessage,
    embedCreate,
    banUser,
    checkContains,
    checkUserPerms,
    loop,
    subCommand,
    newSlashCommand,
    newCommand,
    timeoutUser,
    splitText,
    textSplit,
    getTextSplitLength,
    slashOption,
    newEvent,
    createChannel,
    startBot,
    addRole,
    removeRole,
    changeNick,
    addReactions,
    unbanUser,
    setPresence,
    Var,
    Load,
    Buttons,
    Menus
};
