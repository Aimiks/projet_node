mysql = require('mysql') ;
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

function connexion(login, password)
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