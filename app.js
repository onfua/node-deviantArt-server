let fs = require('fs');  //afahana mamaky s msave fichier
let express = require('express');  //framework manamora creation serveur
let formidable = require('formidable');  //framework manamora upload fichier
let bodyParser = require("body-parser");  //framework afaana mparse données
let mysql = require('mysql');  //framework afaana mconnect am BD mysql
let cors = require('cors');    //framework mdebloquer acces av any ivelany

//Ts maints ilaina
let app=express();
app.use(bodyParser.json());     //asaina mampiasa bodyparser le app izay express
app.use(cors());        //asaina mampiasa cors le app izay express
app.use(express.json());  //omena fahafahana mampiasa json le express
app.listen(8080,() => {         //definition de port
    console.log("Started on PORT 8080");
});


//rehefa aka post s amaly
app.post('/', (req, res) => {
    //req.body = maka n contenu n post
});

//rehefa aka get s amaly
app.get('/', (req, res) => {
    //req.query = maka n contenu n get
});




//mysql
//mse connecter am mysql kel nje
let con = mysql.createConnection({
    host: "localhost",  //serveur mis anle mysql
    user: "root",   //user
    password: "",   //mdp
    database: 'deviantart'  //nom BD
});

//fanaovana requette
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {   //err ra mis erreur d aon n ita
      if (err) throw err;   //result mis n valina ra ohtr oe nanao select,,ra insert into s n tariny d tsis zn anaty result
      console.log(result);
    });
});


//fs
//methode asynchrone dol reo
//mamaky fichier
fs.readFile('nom anle fichier', function(err, data) {   //azo lazaina zn oe sad lien le eo amle nom fichier
    //err mis n erreur
    //data mis n contenu anle fichier
});

//mamorona fichier
fs.writeFile('nom anle fichier', 'contenu n ato', function (err) {  //azo lazaina zn oe sad lien le eo amle nom fichier
    //err mis n erreur
});

//mamafa fichier
fs.unlink('nom anle fichier', function (err) {
    //err mis n erreur
});

//mrenommer fichier
fs.rename('nom anle fichier o renomena', 'nom vaovao', function (err) {
    if (err) throw err;
    //err mis n erreur
});


//formidable
//exemple
app.post('/uploader', (req, res) => {
    let form = new formidable.IncomingForm();

    //msafidy 1 amreto,,,le faha 2 n ilaitsik mazava oaz

    //raha placena anaty dossier temporair ftsn
    form.parse(req, function (err, fields, files) {
      console.log('File uploaded');
    });

    //raha enregistrena anaty serveur ndray
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;            //filetoupload = attribut name nomena anle input file na anarany anty post
      var newpath = './upload/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        console.log('File uploaded and moved!');
      });
    });

});