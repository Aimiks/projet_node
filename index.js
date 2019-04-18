var express = require('express');
var fs = require('fs') ;
var sockets = require('socket.io');
var db = require('./db.js');
var server = express() ;

db.init();

server.
	// Page d'accueil
	get('/', function(req, res) {
		res.setHeader('Content-Type', "text/html; charset=utf-8");
		res.render('index');
	})

	.get('/admin', function(req, res) {
		res.setHeader('Content-Type', "text/html; charset=utf-8");
		res.render('admin');
	})

	.get('/sondages/admin', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.getLesSondages().then((lesSondages)=>{
            console.log(lesSondages);
            res.render('admin', {lesSondages});
		});
    })

    .get('/sondages/:id/admin', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.getSondage(req.params.id).then((leSondage)=>{
            console.log(leSondage);
            var idSondage = req.params.id;
            res.render('admin', {leSondage, idSondage});
        });
    })

    .get('/sondages/creation', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
		res.render('creation');
    })

    .get('/sondages/creation/nouveau', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.insertNewSondage();
		res.render('creation');
    })

    .get('/etudiant', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        res.render('etudiant');
    })

    .get('/enseignant/etudiant', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.getLesEnseignant().then((lesEnseignants)=>{
            console.log(lesEnseignants);
            res.render('etudiant', {lesEnseignants});
        }).catch(error => console.error(error));
    })
    .get('/:id/videopro/:idquestion', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.getQuestion(req.params.id).then((lesQuestions)=>{
            console.log(lesQuestions);
            var idQuestion = req.params.idquestion;
            res.render('videopro', {lesQuestions, idQuestion});
        }).catch(error => console.error(error));
    })
	.use(express.static(__dirname + '/css'))
	.use(express.static(__dirname + '/img'))
	.use(express.static(__dirname + '/lib/jQuery'))
	.use(express.static(__dirname + '/views'))

	.use(function(req, res, next){
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.status(404).send('Vous êtes sur une page inconnue.');
	})
	//.engine('html', require('ejs').renderFile)
	.set('view engine','ejs') ;
	

// Chargement de socket.io
var io = sockets.listen(server.listen(8080));

// Puis on traite les demandes en provenance du navigateur de l'utilisateur
io.sockets.on('connection', function (request) {
	console.log('Un utilisateur s\'est connecté avec la session  #' + request.id);
	// Info à tous les utilisateurs connectés, sauf à celui qui se connecte (à tester avec 2 navigateurs !)
	request.broadcast.emit('info', {text: 'Un utilisateur s\'est connecté'});
});
