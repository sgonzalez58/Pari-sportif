let fileJsonServer = require('./file_json');

let content = new fileJsonServer("./config/connection_server.json");
let arrayJson = content.arrayJson();

let host = arrayJson.host;
let port = arrayJson.port;

exports.host = host;
exports.port = port;
