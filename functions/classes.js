const { createChannel } = require("./admin/channels/Create");
const removeRole = require("./admin/roles/Remove");
const addRole = require("./admin/roles/Add");
const addReactions = require("./message/Reactions");
const setPresence = require("./client/setPresence");
const changeNick = require("./mod/User/Nick");
const banUser = require("./mod/User/Ban");
const unbanUser = require("./mod/User/Unban");
const timeoutUser = require("./mod/User/Timeout");
const loop = require("./misc/loop");
const { checkUserPerms } = require("./permissions/User/Check");
const { textSplit, splitText, getTextSplitLength } = require("./message/Split");

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
        SetNick: changeNick,
        Check: {
            Permissions: checkUserPerms
        }
    },
    Loop: loop,
    Message: {
        Split: {
            SetText: textSplit,
            GetText: splitText,
            Length: getTextSplitLength
        }
    }
}