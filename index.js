var express = require('express');
var fs = require('fs') ;
var sockets = require('socket.io');
var db = require('./db.js');
var server = express() ;
var rooms = {};
var session = require("express-session")({
    secret: "fDN4lhz19o",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

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
            res.render('admin', {lesSondages});
		});
    })

    .get('/sondages/:id/admin', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        db.getSondage(req.params.id).then((leSondage)=>{
			res.render('admin', {leSondage});
			rooms[req.params.id] = {subs:[]};
        });
    })
    .get('/sondages/:id([0-9]+)', function(req, res) {
        res.setHeader('Content-Type', "text/html; charset=utf-8");
        if(rooms[req.params.id]) {
            db.getSondage(req.params.id).then((leSondage)=>{
                res.render('sondage', {sondageId: req.params.id});
            });
        } else {
            res.render('error', {errorTxt: "Cette salle n'existe pas."})
        }

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

    .get('/sondages/liste', function(req, res) {
        db.getLesSondages().then((lesSondages)=>{
        res.render('sondagesOuvertListe', {sondages : lesSondages.filter( s => rooms[s.id_sondage])});
        });
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
	.use(express.static(__dirname + '/css'))
	.use(express.static(__dirname + '/img'))
	.use('/jquery',express.static(__dirname + '/lib/jQuery'))
	.use(express.static(__dirname + '/views'))

	.use(function(req, res, next){
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.status(404).send('Vous êtes sur une page inconnue.');
    })
    .use(session)
	//.engine('html', require('ejs').renderFile)
	.set('view engine','ejs') ;
	

// Chargement de socket.io
var io = sockets.listen(server.listen(8080));
io.use(sharedsession(session));
io.on('connection', function(client) {
    console.log(client.id);
    console.log(client.handshake.session);
    
    client.on('join', function(data) {
        console.log(client.handshake.session.userdata);
        rooms[data.id].subs.push(client.id);
        io.emit('new_client', {id: client.id, user: client.handshake.session.userdata});

    });
    
    client.on('setUserData', function(data) {
        client.handshake.session.userdata = data;
        //console.log(client.handshake.session.userdata);
        client.handshake.session.save();
    });
});
