let fs = require('fs');  //afahana mamaky s msave fichier
let express = require('express');  //framework manamora creation serveur
let formidable = require('formidable');  //framework manamora upload fichier
let mysql = require('mysql');  //framework afaana mconnect am BD mysql
let cors = require('cors');    //framework mdebloquer acces av any ivelany


//Ts maints ilaina
let app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) ;
app.use(cors());        //asaina mampiasa cors le app izay express
app.use(express.json());  //omena fahafahana mampiasa json le express
app.listen(4300,() => {         //definition de port
    console.log("Started on PORT 4300");
});


//rehefa aka post s amaly
app.post('/', (req, res) => {
    //req.body = maka n contenu n post

});

//rehefa aka get s amaly
app.get('/users', (req, res) => {
    //req.query = maka n contenu n get

    connection.query("SELECT * FROM membres", function (err, result, fields) {  
    if (err) throw err; 
    console.log(result);
    });
});

//mysql
//mse connecter am mysql kel nje

let dbConfig = {
    host: "localhost",  //serveur mis anle mysql
    port: 3308,
    user: "root",   //user
    password: "",   //mdp
    database: 'deviantart'  //nom BD
}

let connection ;

connection = mysql.createConnection(dbConfig);

connection.connect(function(err) { 
    if(err) {      
    console.log('error when connecting to db:', err);
    
    }else{
        console.log("Connected") ;
    }                            
});   

/*fs
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
});*/


//formidable
//exemple
app.post('/uploader', (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;            //filetoupload = attribut name nomena anle input file na anarany anty post
      var newpath = './uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        console.log('File uploaded and moved!');
      });
    });

});