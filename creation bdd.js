const mysql = require('mysql');
const { arrayBuffer } = require('stream/consumers');

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "root",

});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  db.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'pariSportif'", function (err, result) {
    if (err) throw err;
    if (result.length == 0){
      db.query("CREATE DATABASE pariSportif", function (err, result) {  
        if (err) throw err;  
        console.log("Database created");  
        });
    }else{
      console.log("Database exists.");
    };
  });
});