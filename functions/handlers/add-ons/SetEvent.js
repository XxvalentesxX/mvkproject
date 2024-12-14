const events = {
    applicationCommandCreate: 'applicationCommandCreate',
    applicationCommandDelete: 'applicationCommandDelete',
    applicationCommandUpdate: 'applicationCommandUpdate',
    channelCreate: 'channelCreate',
    channelDelete: 'channelDelete',
    channelPinsUpdate: 'channelPinsUpdate',
    channelUpdate: 'channelUpdate',
    emojiCreate: 'emojiCreate',
    emojiDelete: 'emojiDelete',
    emojiUpdate: 'emojiUpdate',
    guildBanAdd: 'guildBanAdd',
    guildBanRemove: 'guildBanRemove',
    guildCreate: 'guildCreate',
    guildDelete: 'guildDelete',
    guildIntegrationsUpdate: 'guildIntegrationsUpdate',
    guildMemberAdd: 'guildMemberAdd',
    guildMemberAvailable: 'guildMemberAvailable',
    guildMemberRemove: 'guildMemberRemove',
    guildMembersChunk: 'guildMembersChunk',
    guildMemberUpdate: 'guildMemberUpdate',
    guildScheduledEventCreate: 'guildScheduledEventCreate',
    guildScheduledEventDelete: 'guildScheduledEventDelete',
    guildScheduledEventUpdate: 'guildScheduledEventUpdate',
    guildScheduledEventUserAdd: 'guildScheduledEventUserAdd',
    guildScheduledEventUserRemove: 'guildScheduledEventUserRemove',
    guildUnavailable: 'guildUnavailable',
    guildUpdate: 'guildUpdate',
    interactionCreate: 'interactionCreate',
    invalidated: 'invalidated',
    inviteCreate: 'inviteCreate',
    inviteDelete: 'inviteDelete',
    messageCreate: 'messageCreate',
    messageDelete: 'messageDelete',
    messageDeleteBulk: 'messageDeleteBulk',
    messageReactionAdd: 'messageReactionAdd',
    messageReactionRemove: 'messageReactionRemove',
    messageReactionRemoveAll: 'messageReactionRemoveAll',
    messageReactionRemoveEmoji: 'messageReactionRemoveEmoji',
    messageUpdate: 'messageUpdate',
    presenceUpdate: 'presenceUpdate',
    rateLimit: 'rateLimit',
    ready: 'ready',
    roleCreate: 'roleCreate',
    roleDelete: 'roleDelete',
    roleUpdate: 'roleUpdate',
    shardDisconnect: 'shardDisconnect',
    shardError: 'shardError',
    shardReady: 'shardReady',
    shardReconnecting: 'shardReconnecting',
    shardResume: 'shardResume',
    stageInstanceCreate: 'stageInstanceCreate',
    stageInstanceDelete: 'stageInstanceDelete',
    stageInstanceUpdate: 'stageInstanceUpdate',
    stickerCreate: 'stickerCreate',
    stickerDelete: 'stickerDelete',
    stickerUpdate: 'stickerUpdate',
    threadCreate: 'threadCreate',
    threadDelete: 'threadDelete',
    threadListSync: 'threadListSync',
    threadMembersUpdate: 'threadMembersUpdate',
    threadMemberUpdate: 'threadMemberUpdate',
    threadUpdate: 'threadUpdate',
    typingStart: 'typingStart',
    userUpdate: 'userUpdate',
    voiceStateUpdate: 'voiceStateUpdate',
    warn: 'warn',
    webhookUpdate: 'webhookUpdate'
  };
  
  function newEvent({ type, action }) {
    const eventType = events[type];
  
    if (!eventType) {
      throw new Error(`Invalid event type: ${type}`);
    }
  
    return (client) => {
      client.on(eventType, async (...args) => {
        try {
          await action.code(...args);
        } catch (error) {
          console.error(`Error in ${eventType} event handler:`, error);
        }
      });
    };
  }
  
  module.exports = { newEvent, events };
  