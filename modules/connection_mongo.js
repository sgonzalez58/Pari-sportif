let fileJsonServer = require('./file_json');

let content = new fileJsonServer("./config/connection_mongo.json");
let arrayJson = content.arrayJson();

let type = arrayJson.type;
let host = arrayJson.host;
let port = arrayJson.port;
let dev = arrayJson.dev;

exports.type = type;
exports.host = host;
exports.port = port;
exports.dev = dev;
