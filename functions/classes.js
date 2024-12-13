const { createChannel } = require("./admin/channels/Create");
const removeRole = require("./admin/roles/Remove");
const addRole = require("./admin/roles/Add");
const addReactions = require("./message/Reactions");

module.exports = {
    Add: {
        Role: addRole,
        Reactions: addReactions
    },
    Create: {
        Channel: createChannel
    },
    Remove: {
        Role: removeRole
    }
}