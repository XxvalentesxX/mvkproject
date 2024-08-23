const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..', 'variables');

function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

createDirIfNotExists(basePath);
createDirIfNotExists(path.join(basePath, 'global', 'globaluser'));
createDirIfNotExists(path.join(basePath, 'global'));
createDirIfNotExists(path.join(basePath, 'user'));
createDirIfNotExists(path.join(basePath, 'server'));
createDirIfNotExists(path.join(basePath, 'channel'));

function variableCreate({ name, value, type }) {
  const types = ['global', 'user', 'server', 'channel', 'global_user'];
  if (!types.includes(type)) {
    throw new Error('Invalid type. Valid types are: global, user, server, channel, global_user.');
  }

  let filePath;
  if (type === 'global') {
    filePath = path.join(basePath, 'global', `${name}.json`);
  } else if (type === 'global_user') {
    filePath = path.join(basePath, 'global', 'globaluser', `${name}.json`);
  } else if (type === 'user') {
    filePath = path.join(basePath, 'user', `${name}.json`);
  } else if (type === 'server') {
    filePath = path.join(basePath, 'server', `${name}.json`);
  } else if (type === 'channel') {
    filePath = path.join(basePath, 'channel', `${name}.json`);
  }

  if (fs.existsSync(filePath)) {
    throw new Error(`Variable ${name} already exists.`);
  }

  const variableData = {
    name,
    value,
    type
  };

  fs.writeFileSync(filePath, JSON.stringify(variableData, null, 2), 'utf8');
  return 'Variable created successfully.';
}

function varExists({ name, type }) {
  const types = ['global', 'user', 'server', 'channel', 'global_user'];
  if (!types.includes(type)) {
    throw new Error('Invalid type. Valid types are: global, user, server, channel, global_user.');
  }

  let filePath;
  if (type === 'global') {
    filePath = path.join(basePath, 'global', `${name}.json`);
  } else if (type === 'global_user') {
    filePath = path.join(basePath, 'global', 'globaluser', `${name}.json`);
  } else if (type === 'user') {
    filePath = path.join(basePath, 'user', `${name}.json`);
  } else if (type === 'server') {
    filePath = path.join(basePath, 'server', `${name}.json`);
  } else if (type === 'channel') {
    filePath = path.join(basePath, 'channel', `${name}.json`);
  }

  return fs.existsSync(filePath);
}

function setVar({ name, value, userID }) {
  const type = userID ? 'global_user' : 'global';
  if (!varExists({ name, type })) {
    throw new Error(`Variable ${name} does not exist. Create the variable with variableCreate before using setVar.`);
  }

  const filePath = path.join(basePath, 'global', userID ? 'globaluser' : '', `${name}.json`);
  const variableData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  variableData.value = value;
  fs.writeFileSync(filePath, JSON.stringify(variableData, null, 2), 'utf8');
}

function setUserVar({ name, value, userID, serverID }) {
  const filePath = path.join(basePath, 'user', `${userID || 'default'}.json`);

  let data;
  if (!fs.existsSync(filePath)) {
    data = { [name]: { value, serverID } };
  } else {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data[name] = { value, serverID };
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function setServerVar({ name, value, serverID }) {
  const filePath = path.join(basePath, 'server', `${serverID || 'default'}.json`);

  let data;
  if (!fs.existsSync(filePath)) {
    data = { [name]: value };
  } else {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data[name] = value;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function setChannelVar({ name, value, channelID, serverID }) {
  const filePath = path.join(basePath, 'channel', `${channelID || 'default'}.json`);

  let data;
  if (!fs.existsSync(filePath)) {
    data = { [name]: { value, serverID } };
  } else {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data[name] = { value, serverID };
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function getVar({ name, userID }) {
  const type = userID ? 'global_user' : 'global';
  if (!varExists({ name, type })) {
    throw new Error(`Variable ${name} does not exist.`);
  }

  const filePath = path.join(basePath, 'global', userID ? 'globaluser' : '', `${name}.json`);
  const variableData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return variableData.value;
}

function getUserVar({ name, userID, serverID }) {
  const filePath = path.join(basePath, 'user', `${userID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`User file ${userID || 'default'} not found.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`Variable ${name} does not exist for user ${userID || 'default'}.`);
  }

  if (serverID && data[name].serverID !== serverID) {
    throw new Error(`Variable ${name} does not belong to server ${serverID}.`);
  }

  return data[name].value;
}

function getServerVar({ name, serverID }) {
  const filePath = path.join(basePath, 'server', `${serverID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Server file ${serverID || 'default'} not found.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`Variable ${name} does not exist for server ${serverID || 'default'}.`);
  }

  return data[name];
}

function getChannelVar({ name, channelID, serverID }) {
  const filePath = path.join(basePath, 'channel', `${channelID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Channel file ${channelID || 'default'} not found.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`Variable ${name} does not exist for channel ${channelID || 'default'}.`);
  }

  if (serverID && data[name].serverID !== serverID) {
    throw new Error(`Variable ${name} does not belong to server ${serverID}.`);
  }

  return data[name].value;
}

module.exports = {
  variableCreate,
  varExists,
  setVar,
  setUserVar,
  setServerVar,
  setChannelVar,
  getVar,
  getUserVar,
  getServerVar,
  getChannelVar
};
