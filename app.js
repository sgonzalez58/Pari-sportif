const express = require("express");
const path = require("path");
const server = require("mysql");
const con = require("./modules/connexion_mysql");
  
const app = express();
const port = process.env.PORT || con.port;

const db = server.createConnection({
          
   host: con.host,
 
   user: con.user,
 
   password: con.password,
 
   database: con.database,
 });

 db.connect((function(err){
   if (err) throw err;
   console.log('Connection à la base de donnée PariSportif');
 }));


  
// Setting path for public directory 
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));



// Handling request 
app.post("/addEquipe", (req, res) => {
   res.json("Equipe ajoutée avec succès.");
   db.query("INSERT INTO equipe (nom, logo) VALUES ? ; ", [[[req.body.nom, req.body.logo]]], function (err, result){
      if (err) throw err;
      console.log('Insertion réussie');
   });
})

app.post("/loadEquipe", (req, res) => {
   db.query("SELECT nom, logo FROM equipe;", function (err, result, fields){
      if (err) throw err;
      res.json(result);
      console.log("Données envoyées.")
   });
})

app.post("/deleteEquipe", (req, res) => {
   db.query("DELETE FROM equipe WHERE nom = ? ;", [[[req.body.nom]]], function (err, result){
      if (err) throw err;
      console.log('Suppression réussi');
      res.json('Suppresion réussie');
   })
})
  
// Server Setup
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});