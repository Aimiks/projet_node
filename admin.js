var express = require('express');
var fs = require('fs') ;
var sockets = require('socket.io');

var server = express() ;


// Chargement de socket.io
var io = sockets.listen(server.listen(8080));

// Puis on traite les demandes en provenance du navigateur de l'utilisateur
io.sockets.on('connection', function (request) {
    console.log('Un utilisateur s\'est connecté avec la session  #' + request.id);
});
