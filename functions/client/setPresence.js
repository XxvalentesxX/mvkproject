const { ActivityType } = require('discord.js');

const activityTypes = {
  listening: ActivityType.Listening,
  playing: ActivityType.Playing,
  watching: ActivityType.Watching,
  streaming: ActivityType.Streaming,
  custom: ActivityType.Custom,
  competing: ActivityType.Competing,
};

async function setPresence(client, { activities, time = 5000 }) {
  if (!activities || activities.length === 0) {
    console.error('No activities provided for setPresence.');
    return;
  }

  let currentIndex = 0;
  let lastActivity = null;

  const updatePresence = async () => {
    const activity = activities[currentIndex];

    if (!activity || !activity.name || !activity.type) {
      console.error('Activity is not properly formatted:', activity);
      return;
    }

    const validStatuses = ['idle', 'dnd', 'online', 'offline'];
    if (!validStatuses.includes(activity.status)) {
      console.error('Invalid status:', activity.status);
      return;
    }

    const validTypes = Object.keys(activityTypes);
    if (!validTypes.includes(activity.type)) {
      console.error('Invalid activity type:', activity.type);
      return;
    }

    let activityType = activityTypes[activity.type];

    if (lastActivity && lastActivity.name === activity.name && lastActivity.type === activityType) {
      console.log('Activity is the same, forcing update...');
      await client.user.setPresence({
        activities: [{
          name: activity.name,
          type: activityType,
          url: activity.url || null,
          state: activity.state || null,
        }],
        status: activity.status || 'online',
      });
      lastActivity = activity;
      return;
    }

    try {
      await client.user.setPresence({
        activities: [{
          name: activity.name,
          type: activityType,
          url: activity.url || null,
          state: activity.state || null,
        }],
        status: activity.status || 'online',
      });
    } catch (err) {
      console.error('Error setting presence:', err);
    }

    lastActivity = activity;
    currentIndex = (currentIndex + 1) % activities.length;
  };

  await updatePresence();
  setInterval(updatePresence, time);
}

module.exports = setPresence;
