const express = require("express")
const path = require("path");
const server = require("mysql");
  
const app = express();
const port = process.env.PORT || 3000;

const db = server.createConnection({
          
   host: "localhost",
 
   user: "root",
 
   password: "root",
 
   database: 'pariSportif',
 });


  
// Setting path for public directory 
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));



// Handling request 
app.post("/request", (req, res) => {
   res.json([{
      name_recieved: req.body.name,
      designation_recieved: req.body.designation
   }]);
   db.connect((function(err){
      if (err) throw err;
      console.log('Connection à la base de donnée PariSportif');
      db.query("INSERT INTO equipe (nom, logo) VALUES ? ; ", [[[req.body.name, req.body.designation]]], function (err, result){
        if (err) throw err;
        console.log('Insertion réussie');
      });
   }))
})
  
// Server Setup
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});