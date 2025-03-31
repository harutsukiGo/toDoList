 const boutonPlus = document.getElementById("boutonPlus");
const listeTaches = document.getElementById("liste-tache")
const creationTache = document.getElementById("creation-tache")


let cpt = 1;
cacher(creationTache)

boutonPlus.addEventListener("click", function () {
    if (cpt % 2 !== 0) {
        cpt++;
        afficher(creationTache)
        creerTache();
        const boutonValider = document.getElementById("valider");
        boutonValider.addEventListener("click", function () {
            affichageTache();
        });
    } else {
        cpt++;
        cacher(creationTache)
    }
});

function creerTache() {
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
}

function affichageTache() {
    let nomTache = document.getElementById("nomTache");
    let description = document.getElementById("descTache");
    let importante = document.getElementById("important");

    const divTache = document.createElement('div');
    divTache.id = "div-tache";
    divTache.innerHTML = `
        <strong class="nomDeLaTache">${nomTache.value}</strong>
        <br>
        ${description.value}
        <br>
        ${importante.checked ? 'Tâche importante !' : ''}
        <button class="moins">X</button>`;

    divTache.querySelector('.moins').addEventListener('click', function () {
        divTache.remove();
    });
    listeTaches.appendChild(divTache);
}

function cacher(element) {
    element.classList.add('cache');
}

function afficher(element) {
    element.classList.remove('cache')
}

function afficherDate() {
    let date = document.querySelector(".titre");
    let dateActuel = new Date();
    date.textContent = dateActuel.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
     });
}

document.addEventListener('DOMContentLoaded', function () {
    afficherDate();

});