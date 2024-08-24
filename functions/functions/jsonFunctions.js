class JSONHandler {
    constructor() {
      this.jsonData = {};
    }
  
    jsonParse(data) {
      try {
        this.jsonData = typeof data === 'string' ? JSON.parse(data) : data;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  
    jsonUnset({ key }) {
      const keys = key.split('/');
      let temp = this.jsonData;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) return;
        temp = temp[keys[i]];
      }
  
      delete temp[keys[keys.length - 1]];
    }
  
    jsonSet({ key, value }) {
      const keys = key.split('/');
      let temp = this.jsonData;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) temp[keys[i]] = {};
        temp = temp[keys[i]];
      }
  
      temp[keys[keys.length - 1]] = value;
    }
  
    json({ key }) {
      const keys = key.split('/');
      let temp = this.jsonData;
  
      for (let i = 0; i < keys.length; i++) {
        if (!temp[keys[i]]) return null;
        temp = temp[keys[i]];
      }
  
      return temp;
    }
  
    jsonPretty({ spaces = 2 } = {}) {
      return JSON.stringify(this.jsonData, null, spaces);
    }
  
    jsonStringify() {
      return JSON.stringify(this.jsonData);
    }
  
    jsonClear() {
      this.jsonData = {};
    }
  
    jsonExists({ key }) {
      const keys = key.split('/');
      let temp = this.jsonData;
  
      for (let i = 0; i < keys.length; i++) {
        if (!temp[keys[i]]) return false;
        temp = temp[keys[i]];
      }
  
      return true;
    }
  }
  
  const jsonHandler = new JSONHandler();
  
  module.exports = {
    jsonParse: jsonHandler.jsonParse.bind(jsonHandler),
    jsonUnset: jsonHandler.jsonUnset.bind(jsonHandler),
    jsonSet: jsonHandler.jsonSet.bind(jsonHandler),
    json: jsonHandler.json.bind(jsonHandler),
    jsonPretty: jsonHandler.jsonPretty.bind(jsonHandler),
    jsonStringify: jsonHandler.jsonStringify.bind(jsonHandler),
    jsonClear: jsonHandler.jsonClear.bind(jsonHandler),
    jsonExists: jsonHandler.jsonExists.bind(jsonHandler),
  };
  