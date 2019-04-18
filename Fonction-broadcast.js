
class user {
    constructor(nom){
        this.nom = nom
        this.rep = null
    }

}

// // Puis on traite les demandes en provenance du navigateur de l'utilisateur
// io.sockets.on('connection', function (request) {
//     console.log('Un utilisateur s\'est connecté avec la session  #' + request.id);
//     // Info à tous les utilisateurs connectés, sauf à celui qui se connecte (à tester avec 2 navigateurs !)
//     request.broadcast.emit('info', 'Un utilisateur s\'est connecté');
// });

// Puis on traite les demandes en provenance du navigateur de l'utilisateur
io.sockets.on('connection', function (request, user) {
    console.log('Un utilisateur s\'est connecté avec la session  #' + request.id);
    // Info à tous les utilisateurs connectés, sauf à celui qui se connecte (à tester avec 2 navigateurs !)
    request.broadcast.emit('info', 'L\'utilisateur "'+ user.nom +'" s\'est connecte au sondage');
});


// Puis on traite les demandes en provenance du navigateur de l'utilisateur
io.sockets.on('connection', function (request) {
    console.log('Un utilisateur s\'est connecté avec la session  #' + request.id);
    request.emit('info', {'text' : 'Vous avez connecté le serveur avec la session ' + request.id});
    request.on('request', function (message) {
        console.log('request');
        if (message.command == 'identify') {
            console.log('L\'utilisateur "' + user.nom + '" veut s\'identifier') ;
            request.emit('info', {'text' : 'Vous avez été identifié'});
        }
    });
});
