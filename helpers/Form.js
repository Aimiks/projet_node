var idquestion = 0;
var idrep = 0;
//On crée un élément de type input
var saut = document.createElement('hr');

function SupDiv(IdDiv){
    document.getElementById(IdDiv.id).remove();
}

//Fonction d'ajout de groupe
function AjoutQuestion(){

    //On crée un élément de type div
    var newDiv = document.createElement('div');
    //On ajoute un attribut id à notre paragraphe
    newDiv.setAttribute("class","question");
    newDiv.setAttribute("id","question"+ idquestion);

    //On crée un élément de type input
    var newInput = document.createElement('input');
    //On ajoute un attribut id
    newInput.setAttribute("class",'question_input');
    newInput.setAttribute("placeholder",'Question ?');

    console.log("ok");
    //On crée un élément de type bouton
    var ajrep = document.createElement('button');
    ajrep.setAttribute("class",'w3-button w3-dark-grey ');
    var Id = 'question_' + idquestion;
    ajrep.id = Id;
    ajrep.setAttribute("onclick",'AjoutRep('+ Id +')');
    var textebouton = document.createTextNode('Ajout réponse');
    //On insère le texte dans notre bouton
    ajrep.appendChild(textebouton);

    //On accède à notre bouton
    var but = document.getElementById("AjoutQuestion");
    var parentdiv = document.getElementById("AjoutQuestion").parentNode;

    //On crée un élément de type bouton
    var supQ = document.createElement('img');
    supQ.setAttribute("src",'img/cross.jpg');
    supQ.setAttribute("style",'width:20px;float:right');
    supQ.setAttribute("onclick",'SupDiv(groupe'+ idgroupe +')');


    //On insère notre div juste avant
    parentdiv.insertBefore(newDiv, but);

    newDiv.append(newInput);
    newDiv.append(supQ);
    newDiv.append(saut);
    newDiv.append(ajrep);

    idquestion++
};

//Fonction d'ajout de groupe
function AjoutRep(Id) {
    //if ()

    //On crée un élément de type p
    var newDiv = document.createElement('div');
    //On ajoute un attribut id à notre paragraphe
    newDiv.setAttribute("class", "rep");
    newDiv.setAttribute("id", "rep" + idrep);

    //On crée un élément de type input
    var newInput = document.createElement('input');
    //On ajoute un attribut id
    newInput.setAttribute("class",'sousgroupe_input');

    var newRadio = document.createElement('radio');
    newRadio.id= "repquestion"+idquestion;

    //On accède à notre premier paragraphe
    var but = document.getElementById(Id.id);
    var parentdiv = but.parentNode;

    //On crée un élément de type bouton
    var supRep = document.createElement('img');
    supRep.setAttribute("src",'img/cross.jpg');
    supRep.setAttribute("style",'width:20px;float:right');
    supRep.setAttribute("onclick",'SupDiv(rep' + idrep + ')');

    //On insère notre nouveau paragraphe juste avant
    parentdiv.insertBefore(newDiv, but);

    newDiv.append(newInput);
    newDiv.append(newRadio);
    newDiv.append(supRep);
    newDiv.append(saut);

    idsousgroupe++;
};
// });


/**
 * Fonction de traitement du formulaire de création de squelette de Test.class
 */
function insertSondage() {
    test = {"test":[{"article":$("#options").val(),"nom":$("#nom").val(), "description":$("#desc").val(), "type":$("#type").val()}]};

    groupes = {"groupe":[],"sgroupe":[],"mesure":[]};
    var itg = 0;
    var itsg = 0;
    $(".groupe").each(function(index, value) {

        groupes.groupe.push($(this).children(".groupe_input").val());

        $(this).children(".sousgroupe").each(function(index, value) {
            var sgr = {"intitule":$(this).children(".sousgroupe_input").val(),"idTG":itg};

            groupes.sgroupe.push(sgr);

            $(this).children(".mesure").each(function(index, value) {
                var type = $(this).children(".mesure_libelle_input").val() || null;
                var min = $(this).children(".w3-row-padding").children(".mesure_min_input").val() || null;
                var max = $(this).children(".w3-row-padding").children(".mesure_max_input").val() || null;
                var unite = $(this).children(".w3-row-padding").children(".mesure_unite_input").val() || null;
                var param = $(this).children(".w3-row-padding").children(".mesure_remarque_input").val() || null;
                // console.log(param);

                var mes = {"type":type,"min":min, "max":max,"unite":unite,"param":param,"sgroupe":itsg};
                groupes.mesure.push(mes);
            });

            itsg++;
        });

        itg++;

    });
    // console.log(groupes);
    var templatet = Object.assign(test,groupes);
    // console.log(templatet);

    $.ajax({
        url: 'Action_creation_template_test.php',
        type: 'POST',
        data: {test: JSON.stringify(templatet)},
        async : 'false',
        success : res_ins,
        error : pb_ins
    });


}

function res_ins() {
    console.log('Insertion du test effectue');
    console.log(document.getElementById('corps'));

    // window.location.href="acceuil.php"

    // this.document.getElementById('corps').contentWindow.document.location.href="acceuil.php";
    // Window.location.href("acceuil.php")
}

function pb_ins() {

    window.location.href="creation_template_test.php"

    // this.document.getElementById('corps').contentWindow.document.location.href="acceuil.php";
    // Window.location.href("acceuil.php")
}