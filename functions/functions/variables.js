const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..', '..', '..', 'variables');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function loadVarFile(type, name) {
  const filePath = path.join(basePath, type, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

function saveVarFile(type, name, data) {
  const filePath = path.join(basePath, type, `${name}.json`);
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function variableCreate({ name, type }) {
  if (!['global_user', 'user', 'server', 'channel'].includes(type)) {
    throw new Error('Invalid type. Valid types are: global_user, user, server, channel.');
  }

  const filePath = path.join(basePath, type, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    const initialData = {};
    saveVarFile(type, name, initialData);
    return `Variable ${name} of type ${type} created.`;
  }
  return `Variable ${name} of type ${type} already exists.`;
}

function varExists({ name, type }) {
  const filePath = path.join(basePath, type, `${name}.json`);
  return fs.existsSync(filePath);
}

function setChannelVar({ name, value, channelID, serverID }) {
  const data = loadVarFile('channel', name);
  if (!data[serverID]) {
    data[serverID] = {};
  }
  data[serverID][channelID] = { value };
  saveVarFile('channel', name, data);
}

function getChannelVar({ name, channelID, serverID }) {
  const data = loadVarFile('channel', name);
  return data[serverID] && data[serverID][channelID] ? data[serverID][channelID].value : undefined;
}

function setServerVar({ name, value, serverID }) {
  const data = loadVarFile('server', name);
  data[serverID] = { value };
  saveVarFile('server', name, data);
}

function getServerVar({ name, serverID }) {
  const data = loadVarFile('server', name);
  return data[serverID] ? data[serverID].value : undefined;
}

function setUserVar({ name, value, userID }) {
  const data = loadVarFile('user', name);
  data[userID] = { value };
  saveVarFile('user', name, data);
}

function getUserVar({ name, userID }) {
  const data = loadVarFile('user', name);
  return data[userID] ? data[userID].value : undefined;
}

function setVar({ name, value, userID }) {
  const data = loadVarFile('global_user', name);
  data[userID] = { value };
  saveVarFile('global_user', name, data);
}

function getVar({ name, userID }) {
  const data = loadVarFile('global_user', name);
  return data[userID] ? data[userID].value : undefined;
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
