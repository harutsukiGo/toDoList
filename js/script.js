const boutonPlus = document.getElementById("plus");
const listeTaches = document.getElementById("liste-tache")
const creationTache = document.getElementById("creation-tache")

let cpt = 1;
cacher(creationTache)

boutonPlus.addEventListener("click", function () {
    if (cpt % 2 !== 0) {
        cpt++;
        afficher(creationTache)
        creationTache.innerHTML =
            `<div class="div-nomTache">Nom de la tâche
            <br>
            <input type="text" name="nomTache" id="nomTache" ></div>
            <div class="descriptionTache"> Description de la tâche 
            <br>
            <input type="text" name="descTache" id="descTache"></div>
            <div>Tâche importante
            <br> 
            <input type="checkbox" name="tacheImportante" id="important"></div>
             <div class="boutonValider"> <input type="button" value="Valider" id="valider"></div>`;

        const boutonValider = document.getElementById("valider");
        boutonValider.addEventListener("click", function () {

            let nomTache = document.getElementById("nomTache");
            let description = document.getElementById("descTache");
            let importante = document.getElementById("important");

            listeTaches.innerHTML +=
                `<div id="div-tache"><strong class="nomDeLaTache">${nomTache.value}</strong>
                 <br>
                 ${description.value}
                 <br>
                 ${importante.checked ? 'Tâche importante !' : ''} 
                 <button class="moins"> X </button> </div>`;

            let boutonsMoins = document.querySelectorAll(".moins");

            boutonsMoins.forEach(function(bouton) {
                console.log("fefefefefefef");
                bouton.addEventListener("click", function () {
                    cacher(baliseActuel)
                });
            });


            listeTaches.innerHTML += `<br>`;

        });
    } else {
        cpt++;
        cacher(creationTache)
    }
});


function cacher(element) {
    element.classList.add('cache');
}

function afficher(element) {
    element.classList.remove('cache')
}

function supprimer(element) {
    element.remove()
}