const { ActivityType } = require('discord.js');

const activityTypes = {
  listening: ActivityType.Listening,
  playing: ActivityType.Playing,
  watching: ActivityType.Watching,
  streaming: ActivityType.Streaming,
  custom: ActivityType.Custom,
  compiting: ActivityType.Competing,
};

function setPresence(client, activities, interval = 5000) {
  if (!activities || activities.length === 0) {
    console.error('No activities provided for setPresence.');
    return;
  }

  let currentIndex = 0;
  let lastActivity = null;

  const updatePresence = () => {
    const activity = activities[currentIndex];

    if (!activity || !activity.name) {
      console.error('Activity is not properly formatted:', activity);
      return;
    }

    let activityType = activity.type ? activity.type.toLowerCase() : 'playing';
    activityType = activityTypes[activityType] || ActivityType.Playing;

    if (lastActivity && lastActivity.name === activity.name && lastActivity.type === activityType) {
      console.log('Activity is the same, forcing update...');
      client.user.setPresence({
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
      client.user.setPresence({
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

  updatePresence();
  setInterval(updatePresence, interval);
}

module.exports = setPresence;
