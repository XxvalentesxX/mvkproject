const { sendMessage } = require("./functions/message/Message");
const checkContains = require('./functions/message/checkContains');
const { subCommand, newSlashCommand, slashOption } = require("./functions/handlers/add-ons/SetSlashCommand");
const embedCreate = require('./functions/message/Embed');
const { splitText, textSplit, getTextSplitLength } = require("./functions/message/Split");
const { startBot } = require('./functions/client/startBot');

const { Set, Add, Create, Remove, User, Loop } = require('./functions/classes')
const Var = require('./functions/misc/variables');
const Load = require('./functions/handlers/loader/Load');
const { Buttons } = require("./functions/message/Components/Buttons");
const { Menus } = require("./functions/message/Components/Menus");

module.exports = {
    sendMessage,
    embedCreate,
    checkContains,
    subCommand,
    newSlashCommand,
    splitText,
    textSplit,
    getTextSplitLength,
    slashOption,
    startBot,
    Set,
    Add,
    Create,
    Remove,
    User,
    Loop,
    Var,
    Load,
    Buttons,
    Menus
};
