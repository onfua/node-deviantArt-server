"use strict";
process.env.PWD = process.cwd();
var fs = require('fs'); //afahana mamaky s msave fichier
var express = require('express'); //framework manamora creation serveur
var formidable = require('formidable'); //framework manamora upload fichier
var mysql = require('mysql'); //framework afaana mconnect am BD mysql
var cors = require('cors'); //framework mdebloquer acces av any ivelany
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors( /*{
    origin: "http://localhost:4200"
}*/)); //asaina mampiasa cors le app izay express
app.use(express.json()); //omena fahafahana mampiasa json le express
app.listen(4300, function () {
    console.log("Started on PORT 4300");
});
// Then
app.use(express.static(process.env.PWD + '/public'));
var dbConfig = {
    host: "localhost",
    port: 3308,
    user: "root",
    password: "",
    database: 'deviantart' //nom BD
};
var connection;
connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
    else {
        console.log("Connected");
    }
});
//rehefa aka post s amaly
app.post('/', function (req, res) {
    //req.body = maka n contenu n post
});
app.get('/users', function (req, res) {
    connection.query("SELECT * FROM membres", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
        res.send(result);
    });
});
//mety
app.get('/posts', function (req, res) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
        }
        else {
            connection.query("SELECT publications.*,membres.nomUtilisateur,membres.lienPhoto FROM publications,membres WHERE publications.idMembre=membres.idMembre LIMIT 6", function (err, result, fields) {
                if (err)
                    throw err;
                var tmp = result.map(function (e) {
                    return {
                        idPublication: e.idPublication,
                        idMembre: e.idMembre,
                        saryMembre: "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64'),
                        nomMembre: e.nomUtilisateur,
                        titre: e.titre,
                        description: e.description,
                        saryPublication: "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(e.lienImage)).toString('base64'),
                        datePublication: e.datePublication,
                        nbrVues: e.nombreVues
                    };
                });
                res.send(tmp);
            });
        }
    });
});
app.get('/post', function (req, res) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
        }
        else {
            connection.query("SELECT publications.*,membres.nomUtilisateur,membres.lienPhoto FROM publications,membres WHERE publications.idMembre=membres.idMembre AND publications.idPublication=" + req.query.id, function (err, result, fields) {
                if (err)
                    throw err;
                var tmp = result.map(function (e) {
                    return {
                        idPublication: e.idPublication,
                        idMembre: e.idMembre,
                        saryMembre: "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64'),
                        nomMembre: e.nomUtilisateur,
                        titre: e.titre,
                        description: e.description,
                        saryPublication: "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(e.lienImage)).toString('base64'),
                        datePublication: e.datePublication,
                        nbrVues: e.nombreVues
                    };
                });
                res.send(tmp[0]);
            });
        }
    });
});
app.get('/comments', function (req, res) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
        }
        else {
            connection.query("SELECT commentaires.*,membres.nomUtilisateur,membres.lienPhoto FROM commentaires,membres WHERE commentaires.idMembre=membres.idMembre AND commentaires.idPublication=" + req.query.id, function (err, result, fields) {
                if (err)
                    throw err;
                var tmp = result.map(function (e) {
                    return {
                        contenu: e.contenu,
                        nomMembre: e.nomUtilisateur,
                        saryMembre: "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64')
                    };
                });
                res.send(tmp);
            });
        }
    });
});
app.post('/comments/new', function (req, res) {
    connection.query("INSERT INTO commentaires (contenu, idMembre, idPublication) VALUES('" + req.params.content + "', '" + new Date().getDate() + "', " + req.params.idUser + ", " + req.params.idPost + ")", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
        res.send({
            success: true
        });
    });
});
app.post('/login', function (req, res) {
    connection.query("SELECT * FROM membres WHERE nomUtilisateur='" + req.params.username + "' AND motDePasse='" + req.params.password + "'", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
        if (result.length > 0) {
            res.send({ success: true });
        }
        else {
            res.send({
                success: false,
                errorMessage: "Le nom d'utilisateur ou le mot de passe est incorrect."
            });
        }
    });
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
app.post('/uploader', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path; //filetoupload = attribut name nomena anle input file na anarany anty post
        var newpath = './uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err)
                throw err;
            console.log('File uploaded and moved!');
        });
    });
});
