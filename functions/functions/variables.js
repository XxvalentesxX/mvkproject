const fs = require('fs');
const path = require('path');

// Ruta base para los archivos de variables
const basePath = path.join(__dirname, '..', 'variables');

// Función para crear directorios si no existen
function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Crea directorios necesarios
createDirIfNotExists(basePath);
createDirIfNotExists(path.join(basePath, 'global', 'globaluser'));
createDirIfNotExists(path.join(basePath, 'global'));
createDirIfNotExists(path.join(basePath, 'user'));
createDirIfNotExists(path.join(basePath, 'server'));
createDirIfNotExists(path.join(basePath, 'channel'));

// Función para crear una variable
function variableCreate({ name, value, type }) {
  const types = ['global', 'user', 'server', 'channel', 'global_user'];
  if (!types.includes(type)) {
    throw new Error('Tipo inválido. Los tipos válidos son: global, user, server, channel, global_user.');
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
    throw new Error(`La variable ${name} ya existe.`);
  }

  const variableData = {
    name,
    value,
    type
  };

  fs.writeFileSync(filePath, JSON.stringify(variableData, null, 2), 'utf8');
  return 'Variable creada correctamente.';
}

// Función para verificar si una variable existe
function varExists({ name, type }) {
  const types = ['global', 'user', 'server', 'channel', 'global_user'];
  if (!types.includes(type)) {
    throw new Error('Tipo inválido. Los tipos válidos son: global, user, server, channel, global_user.');
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

// Funciones para establecer variables
function setVar({ name, value, userID }) {
  const type = userID ? 'global_user' : 'global';
  if (!varExists({ name, type })) {
    throw new Error(`La variable ${name} no existe. Crea la variable con variable.create antes de usar set.`);
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

// Funciones para obtener variables
function getVar({ name, userID }) {
  const type = userID ? 'global_user' : 'global';
  if (!varExists({ name, type })) {
    throw new Error(`La variable ${name} no existe.`);
  }

  const filePath = path.join(basePath, 'global', userID ? 'globaluser' : '', `${name}.json`);
  const variableData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return variableData.value;
}

function getUserVar({ name, userID, serverID }) {
  const filePath = path.join(basePath, 'user', `${userID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`No se encontró el archivo de usuario ${userID || 'default'}.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`La variable ${name} no existe para el usuario ${userID || 'default'}.`);
  }

  if (serverID && data[name].serverID !== serverID) {
    throw new Error(`La variable ${name} no pertenece al servidor ${serverID}.`);
  }

  return data[name].value;
}

function getServerVar({ name, serverID }) {
  const filePath = path.join(basePath, 'server', `${serverID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`No se encontró el archivo del servidor ${serverID || 'default'}.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`La variable ${name} no existe para el servidor ${serverID || 'default'}.`);
  }

  return data[name];
}

function getChannelVar({ name, channelID, serverID }) {
  const filePath = path.join(basePath, 'channel', `${channelID || 'default'}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`No se encontró el archivo del canal ${channelID || 'default'}.`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data[name]) {
    throw new Error(`La variable ${name} no existe para el canal ${channelID || 'default'}.`);
  }

  if (serverID && data[name].serverID !== serverID) {
    throw new Error(`La variable ${name} no pertenece al servidor ${serverID}.`);
  }

  return data[name].value;
}

// Exporta las funciones
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
