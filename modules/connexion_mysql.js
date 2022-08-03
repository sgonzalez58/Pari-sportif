let fileJsonServer = require('./file_json');

let contenu = new fileJsonServer("./config/connection_mysql.json");
let arrayJson = contenu.arrayJson();

let host = arrayJson.host;
let user = arrayJson.user;
let password = arrayJson.password;
let database = arrayJson.database;
let port = arrayJson.port;

exports.host = host;
exports.user = user;
exports.password = password;
exports.database = database;
exports.port = port;
