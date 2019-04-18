mysql = require('mysql') ;
var connection;

exports.init = function() {
    connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'node'
    });
    connection.connect( function(err) {
        if (err) {
            console.log("Connexion à la base impossible.");
        } else {
            console.log("Connexion à la base réussie.");
        }
    });
}
exports.connexion = function(login, password)
{
    var requete =   'SELECT `login`, `password` ' +
                    'FROM `administrateur` ' +
                    'WHERE `login` = ? ' +
                    'AND `password`= ?;' ;
    connection.query(requete, [login, password],function(err, rows, fields) {
        if (err) {
            res.write('Impossible de lire les comptes analytiques.');
        } else {
            if (rows.length != 0) {
                //Login ou PASSWORD faux
            }else {
                //Connexion réussie
            }
            /*for (var i=0; i < rows.length; i++) {
                console.log( rows[i].lastname +
                    rows[i].firstname +
                    rows[i].groupTD) ;
            }*/
        }
    });
}
exports.getLesSondages = function() {
    return new Promise(function(resolve, reject){
        var requete =   'SELECT `id_sondage`, `libelle_sondage` ' +
            'FROM `sondage`;';

        connection.query(requete, function(err, rows, fields) {
            if (err) {
                res.write('Impossible de lire les comptes analytiques.');
                reject(new SQLError());
            } else {
                resolve(rows);
            }
        })
    });
}
exports.getSondage = function(id_sondage) {
    return new Promise(function(resolve, reject){
        var requete =   'SELECT `id_sondage`, `libelle_sondage` ' +
            'FROM `sondage`' +
            'WHERE id_sondage = ' + id_sondage + ';';

        connection.query(requete, function(err, rows, fields) {
            if (err) {
                res.write('Impossible de lire les comptes analytiques.');
                reject(new SQLError());
            } else {
                resolve(rows);
            }
        })
    });
}
exports.insertNewSondage = function(titre, questions) {
    return new Promise(function(resolve, reject){
        var requete =   'SELECT `id_sondage`, `libelle_sondage` ' +
            'FROM `sondage`;';

        connection.query(requete, function(err, rows, fields) {
            if (err) {
                res.write('Impossible de lire les comptes analytiques.');
                reject(new SQLError());
            } else {
                resolve(rows);
            }
        })
    });
}
exports.getLesEnseignant = function() {
    return new Promise(function(resolve, reject){
        var requete =   'SELECT `id_enseignant`, `nom_enseignant` ' +
                        'FROM `enseignant`;';

        connection.query(requete, function(err, rows, fields) {
            if (err) {
                res.write('Impossible de lire les comptes analytiques.');
                reject(new SQLError());
            } else {
                resolve(rows);
            }
        })
    });
}
