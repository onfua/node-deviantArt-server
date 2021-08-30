process.env.PWD = process.cwd() ;

let fs = require('fs');  //afahana mamaky s msave fichier
let express = require('express');  //framework manamora creation serveur
let formidable = require('formidable');  //framework manamora upload fichier
let mysql = require('mysql');  //framework afaana mconnect am BD mysql
let cors = require('cors');    //framework mdebloquer acces av any ivelany

let app=express();
app.use(express.urlencoded({extended: true}));
app.use(cors(/*{
    origin: "http://localhost:4200"
}*/));        //asaina mampiasa cors le app izay express
app.use(express.json());  //omena fahafahana mampiasa json le express
app.listen(4300,() => {         //definition de port
    console.log("Started on PORT 4300");
});

// Then
app.use(express.static(process.env.PWD + '/public'));


let dbConfig = {
    host: "localhost",  //serveur mis anle mysql
    port: 3308,
    user: "root",   //user
    password: "",   //mdp
    database: 'deviantart'  //nom BD
}

let connection : any ;

connection = mysql.createConnection(dbConfig);

connection.connect(function(err:any) { 
    if(err) {      
    console.log('error when connecting to db:', err);
    
    }else{
        console.log("Connected") ;
    }                            
});

//rehefa aka post s amaly
app.post('/', (req:any, res:any) => {
    //req.body = maka n contenu n post

});

app.get('/users', (req:any, res:any) => {
    connection.query("SELECT * FROM membres", function (err:any, result:any, fields:any) {  
        if (err) throw err; 
        console.log(result);
        res.send(result) ;
    });
}); 

//mety
app.get('/posts', (req:any, res:any) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect(function(err:any) { 
        if(err) {      
        console.log('error when connecting to db:', err);
        
        }else{
            connection.query("SELECT publications.*,membres.nomUtilisateur,membres.lienPhoto FROM publications,membres WHERE publications.idMembre=membres.idMembre LIMIT 6", function (err:any, result:any, fields:any) {  
                if (err) throw err; 
                let tmp=result.map(function(e:any){
                    return {
                        idPublication:e.idPublication,
                        idMembre:e.idMembre,
                        saryMembre:"data:image/jpeg;base64,"+Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64'),
                        nomMembre:e.nomUtilisateur,
                        titre:e.titre,
                        description:e.description,
                        saryPublication:"data:image/jpeg;base64,"+Buffer.from(fs.readFileSync(e.lienImage)).toString('base64'),
                        datePublication:e.datePublication,
                        nbrVues:e.nombreVues
                    }
                });
                res.send(tmp) ;
            });
        }                            
    });
    
});

app.get('/post', (req:any, res:any) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect(function(err:any) { 
        if(err) {      
        console.log('error when connecting to db:', err);
        
        }else{
            connection.query("SELECT publications.*,membres.nomUtilisateur,membres.lienPhoto FROM publications,membres WHERE publications.idMembre=membres.idMembre AND publications.idPublication="+req.query.id, function (err:any, result:any, fields:any) {  
                if (err) throw err; 
                let tmp=result.map(function(e:any){
                    return {
                        idPublication:e.idPublication,
                        idMembre:e.idMembre,
                        saryMembre:"data:image/jpeg;base64,"+Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64'),
                        nomMembre:e.nomUtilisateur,
                        titre:e.titre,
                        description:e.description,
                        saryPublication:"data:image/jpeg;base64,"+Buffer.from(fs.readFileSync(e.lienImage)).toString('base64'),
                        datePublication:e.datePublication,
                        nbrVues:e.nombreVues
                    }
                });
                res.send(tmp[0]) ;
            });
        }                            
    });
}) ;

app.get('/comments', (req:any, res:any) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect(function(err:any) { 
        if(err) {      
        console.log('error when connecting to db:', err);
        
        }else{
            connection.query("SELECT commentaires.*,membres.nomUtilisateur,membres.lienPhoto FROM commentaires,membres WHERE commentaires.idMembre=membres.idMembre AND commentaires.idPublication="+req.query.id, function(err:any, result:any, fields:any){
                if (err) throw err; 
                let tmp=result.map(function(e:any){
                    return {
                        contenu:e.contenu,
                        nomMembre:e.nomUtilisateur,
                        saryMembre:"data:image/jpeg;base64,"+Buffer.from(fs.readFileSync(e.lienPhoto)).toString('base64')
                    }
                });
                res.send(tmp) ;
            }) ;
        }                            
    });
    
}) ;

app.post('/comments/new', (req:any, res:any) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect(function(err:any) {
        if(err) {      
            console.log('error when connecting to db:', err);
            
        }else{ 
            connection.query("INSERT INTO commentaires (contenu, idMembre, idPublication) VALUES('"+req.params.content+"', '"+new Date().getDate()+"', "+req.params.idUser+", "+req.params.idPost+")", function(err:any, result:any, fields:any){
                if (err) throw err; 
                console.log(result) ;
                res.send({
                    success: true
                }) ;
            }) ; 
        }
    }) ;
}) ;

app.post('/login', (req:any, res:any) => {
    let connection = mysql.createConnection(dbConfig);
    connection.connect(function(err:any) {
        if(err) {      
            console.log('error when connecting to db:', err);
            
        }else{ 
            connection.query("SELECT * FROM membres WHERE nomUtilisateur='"+req.params.username+"' AND motDePasse='"+req.params.password+"'", function(err:any, result:any, fields:any){
                if (err) throw err; 
                console.log(result) ;
                if(result.length > 0){
                    res.send({success: true}) ;
                }else{
                    res.send({
                        success: false,
                        errorMessage: "Le nom d'utilisateur ou le mot de passe est incorrect."
                    }) ;
                }
            }) ; 
        }
    }) ;
}) ;

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
app.post('/uploader', (req:any, res:any) => {
    let form = new formidable.IncomingForm();

    form.parse(req, function (err:any, fields:any, files:any) {
      var oldpath = files.filetoupload.path;            //filetoupload = attribut name nomena anle input file na anarany anty post
      var newpath = './uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err:any) {
        if (err) throw err;
        console.log('File uploaded and moved!');
      });
    });

});