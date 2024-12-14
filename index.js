const { sendMessage } = require("./functions/message/Message");
const checkContains = require('./functions/message/checkContains');
const { subCommand, newSlashCommand, slashOption } = require("./functions/handlers/add-ons/SetSlashCommand");
const { startBot } = require('./functions/client/startBot');

const { Set, Add, Create, Remove, User, Loop, Message } = require('./functions/classes')
const Var = require('./functions/misc/variables');
const Load = require('./functions/handlers/loader/Load');
const { Buttons } = require("./functions/message/Components/Buttons");
const { Menus } = require("./functions/message/Components/Menus");
const Embed = require("./functions/message/Embed");

module.exports = {
    sendMessage,
    checkContains,
    subCommand,
    newSlashCommand,
    slashOption,
    startBot,
    Set,
    Add,
    Create,
    Remove,
    User,
    Loop,
    Message,
    Var,
    Load,
    Buttons,
    Menus,
    Embed
};
