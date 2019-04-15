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
        db.getLesSondages().then((result)=>{
            console.log(result);
            res.render('admin', {result});
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
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
	});
});
