const { createChannel } = require("./admin/channels/Create");
const removeRole = require("./admin/roles/Remove");
const addRole = require("./admin/roles/Add");
const addReactions = require("./message/Reactions");
const setPresence = require("./client/setPresence");
const { startBot } = require("./client/startBot");
const changeNick = require("./mod/changeNick");
const banUser = require("./mod/banUser");
const unbanUser = require("./mod/unbanUser");
const timeoutUser = require("./mod/timeout");
const loop = require("./misc/loop");

module.exports = {
    Add: {
        Role: addRole,
        Message: {
            Reactions: addReactions
        }
    },
    Create: {
        Channel: createChannel
    },
    Remove: {
        Role: removeRole
    },
    Set: {
        Presence: setPresence
    },
    User: {
        Ban: banUser,
        Unban: unbanUser,
        Timeout: timeoutUser,
        SetNick: changeNick
    },
    Loop: loop
}