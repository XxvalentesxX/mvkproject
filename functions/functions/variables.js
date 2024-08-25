const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..', 'variables');

// Asegurar que la ruta y las carpetas existen antes de guardar el archivo
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Funciones comunes para cargar y guardar archivos JSON
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

// Crear variable si no existe
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

// Verificar si la variable existe
function varExists({ name, type }) {
  const filePath = path.join(basePath, type, `${name}.json`);
  return fs.existsSync(filePath);
}

// Funciones para manejar variables de canal
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

// Funciones para manejar variables de servidor
function setServerVar({ name, value, serverID }) {
  const data = loadVarFile('server', name);
  data[serverID] = { value };
  saveVarFile('server', name, data);
}

function getServerVar({ name, serverID }) {
  const data = loadVarFile('server', name);
  return data[serverID] ? data[serverID].value : undefined;
}

// Funciones para manejar variables de usuario
function setUserVar({ name, value, userID }) {
  const data = loadVarFile('user', name);
  data[userID] = { value };
  saveVarFile('user', name, data);
}

function getUserVar({ name, userID }) {
  const data = loadVarFile('user', name);
  return data[userID] ? data[userID].value : undefined;
}

// Funciones para manejar variables globales por usuario
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
