const events = {
    alwaysReply: 'messageCreate',
    replyOnChannelCreate: 'channelCreate'
};

function newEvent({ type, action }) {
    const eventType = events[type];

    if (!eventType) {
        throw new Error(`Invalid event type: ${type}`);
    }

    return (client) => {
        client.on(eventType, async (...args) => {
            try {
                await action(...args);
            } catch (error) {
                console.error(`Error in ${eventType} event handler:`, error);
            }
        });
    };
}

module.exports = { newEvent, events };
