mysql = require('mysql') ;
var connection;

exports.init = function() {
    connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'projet_node'
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
            } else {
                //console.log("ok db sondage");
                /*for (var i=0; i < rows.length; i++) {
                     console.log(rows[i].id_sondage +
                                 rows[i].libelle_sondage) ;
                 }*/
                //console.log(rows);
                resolve(rows);
            }
        })
    });
}

