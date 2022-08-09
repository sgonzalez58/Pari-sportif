const express = require("express");
const path = require("path");
const server = require("mysql");
const con = require("./modules/connexion_mysql");
const { post } = require("jquery");
const { json } = require("express");
const { isSet } = require("util/types");
  
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
   if(req.body.equipe1 != null && req.body.equipe2 != null){
      db.query("SELECT id, nom, logo FROM equipe WHERE id = ? OR id = ?;",[req.body.equipe1, req.body.equipe2],  function (err, result, fields){
         if (err) throw err;
         res.json(result);
         console.log("Données envoyées.")
      });
   }else{
      db.query("SELECT id, nom, logo FROM equipe;", function (err, result, fields){
         if (err) throw err;
         res.json(result);
         console.log("Données envoyées.")
      });
   }
})

app.post("/deleteEquipe", (req, res) => {
   db.query("DELETE FROM equipe WHERE nom = ? ;", [[[req.body.nom]]], function (err, result){
      if (err) throw err;
      console.log('Suppression réussi');
      res.json('Suppresion réussie');
   })
})

app.post("/addMatch", (req, res) => {
   db.query("INSERT INTO rencontre (equipe1, equipe2, date_match) VALUES ((SELECT id FROM equipe WHERE nom = ?), (SELECT id FROM equipe WHERE nom = ?), ?) ;", [req.body.equipe1, req.body.equipe2, req.body.date],  function (err, result){
      if (err) throw err;
      console.log('Insertion réussi');
      if (req.body.resultat1 != '' && req.body.resultat2 != ''){
         db.query('UPDATE rencontre SET score_equipe1 = ?, score_equipe2 = ? WHERE equipe1 = (SELECT id FROM equipe WHERE nom = ?) AND equipe2 = (SELECT id FROM equipe WHERE nom = ?) AND date_match = ?;', [req.body.resultat1, req.body.resultat2, req.body.equipe1, req.body.equipe2, req.body.date], function (err, result){
            if (err) throw err;
         })
      }
      db.query("SELECT * FROM equipe WHERE nom = ? OR nom = ?", [req.body.equipe1, req.body.equipe2], function(err, result){
         if (err) throw err;
         res.json(result);
      })
   })
})

app.post("/loadMatch", (req, res) => {
   db.query("SELECT * FROM rencontre ORDER BY date_match", function (err, result){
      if (err) throw err;
      console.log('Données envoyées.');
      res.json(result);
   })
})

app.post('/supprimerMatch', (req, res) =>{
   let date = new Date(req.body.date);
   db.query("DELETE FROM rencontre WHERE ((equipe1 = (SELECT id FROM equipe WHERE nom = ?) AND equipe2 = (SELECT id FROM equipe WHERE nom = ?)) OR (equipe1 = (SELECT id FROM equipe WHERE nom = ?) AND equipe2 = (SELECT id FROM equipe WHERE nom = ?))) AND date_match = ? ;", [req.body.equipe1, req.body.equipe2, req.body.equipe2, req.body.equipe1, date], function(err, result){
      if (err) throw err;
      res.json('Suppression réussie');
      console.log('Suppression réussie');
   })
})

app.post("/modifierEquipe", (req, res) => {
   if(req.body.nouveau_nom != ''){
      if(req.body.nouveau_logo != ""){
         db.query("UPDATE equipe SET nom = ?, logo = ? WHERE nom = ? ;", [req.body.nouveau_nom, req.body.nouveau_logo, req.body.nom], function (err, result){
            if (err) throw err;
         })
      }else{
         db.query("UPDATE equipe SET nom = ? WHERE nom = ? ;", [req.body.nouveau_nom, req.body.nom], function (err, result){
            if (err) throw err;
         })
      }
   }else if(req.body.nouveau_logo != ""){
      db.query("UPDATE equipe SET logo = ? WHERE nom = ? ;", [req.body.nouveau_logo, req.body.nom], function (err, result){
         if (err) throw err;
      })
   }
   console.log('modification réussi');
   res.json('succès');
});
  
// Server Setup
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});