const mysql = require('mysql');
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

const dbb = mysql.createConnection({
          
  host: "localhost",

  user: "root",

  password: "root",

  database: 'pariSportif',
});

dbb.connect(function(err){
  if (err) throw err;
  console.log('Connection à la base de donnée PariSportif');
  dbb.query("CREATE TABLE equipe (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(100) NOT NULL, logo VARCHAR(100) NOT NULL) ; ", function (err, result){
    if (err) throw err;
    console.log('TABLE equipe created');
    dbb.query("CREATE TABLE joueur (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(100) NOT NULL, prenom VARCHAR(100) NOT NULL, equipe INT NOT NULL, photo VARCHAR(100), FOREIGN KEY (equipe) REFERENCES equipe(id)) ;", function (err, result){
      if (err) throw err;
      console.log('TABLE joueur created');
    });
    dbb.query("CREATE TABLE rencontre (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, equipe1 INT NOT NULL, equipe2 INT NOT NULL, date_match DATE NOT NULL, FOREIGN KEY (equipe1) REFERENCES equipe(id), FOREIGN KEY (equipe2) REFERENCES equipe(id)) ;", function (err, result){
      if (err) throw err;
      console.log('TABLE rencontre created');
    });
  })
});