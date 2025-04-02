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
        `<div class="div-nomTache">
            <input type="text" name="nomTache" id="nomTache" ></div>
            <div class="descriptionTache"> Description de la tâche 
             
            <input type="text" name="descTache" id="descTache"></div>
            <div>Tâche importante
            <br> 
            <input type="checkbox" name="tacheImportante" id="important"></div>
             <div class="boutonValider"> <input type="button" value="Valider" id="valider"></div>`;
}

 async function affichageTache() {
     const nomTache = document.getElementById("nomTache").value;
     const description = document.getElementById("descTache").value;
     const importante = document.getElementById("important").checked;

     try {
         const id = await window.db.ajouterTache(nomTache, description, importante);
         const divTache = document.createElement('div');
         divTache.id = "div-tache";
         divTache.dataset.id = id;
         divTache.innerHTML = `
            <strong class="nomDeLaTache">${nomTache}</strong>
            <br>
            ${description}
            <br>
            ${importante ? 'Tâche importante !' : ''}
            <button class="moins">X</button>`;

         divTache.querySelector('.moins').addEventListener('click', async function() {
             await window.db.supprimerTache(id);
             divTache.remove();
         });

         listeTaches.appendChild(divTache);
         cacher(creationTache);
     } catch (err) {
         console.error('Erreur:', err);
     }
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

document.addEventListener('DOMContentLoaded', async function () {
    afficherDate();
    try {
        const taches = await window.db.chargerTaches();
        taches.forEach(tache => {
            const divTache = document.createElement('div');
            divTache.id = "div-tache";
            divTache.dataset.id = tache.id;
            divTache.innerHTML = `
                <strong class="nomDeLaTache">${tache.nom}</strong>
                <br>
                ${tache.description}
                <br>
                ${tache.importante ? 'Tâche importante !' : ''}
                <button class="moins">X</button>`;

            divTache.querySelector('.moins').addEventListener('click', async function() {
                await window.db.supprimerTache(tache.id);
                divTache.remove();
            });

            listeTaches.appendChild(divTache);
        });
    } catch (err) {
        console.error('Erreur chargement des tâches:', err);
    }
});