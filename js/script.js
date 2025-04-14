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
        let cpt2 = 1;
        const boutonValider = document.getElementById("valider");

        let tacheButton = document.getElementById("importantButton");

        tacheButton.addEventListener("click", function () {
            if (cpt2 % 2 !== 0) {
                tacheButton.style.backgroundColor = "orange";
                cpt2++;
            } else {
                tacheButton.style.backgroundColor = "grey";
                cpt2++;
            }
        });
        boutonValider.addEventListener("click", function () {
            ajouterNouvelleTache().then(() => console.log("La tâche a bien été ajoutée dans la base de données !"))
                .catch((error) => console.log("Erreur lors de l'ajout de la tâche dans la base de données !"));
        });
    } else {
        cpt++;
        cacher(creationTache)
    }
});

function creerTache() {
    creationTache.innerHTML =
        `    <div class="nouvelleTache">Nouvelle tâche</div>
            <div class="div-nomTache">
            <input type="text" name="nomTache" id="nomTache" placeholder="Nom de la tâche"></div>
            <div class="descriptionTache">  
            <input type="text" name="descTache" id="descTache" placeholder="Description de la tâche"></div>
<div id="importantButton"><label for="important">Importante</label></div>   
<input type="checkbox" name="tacheImportante" id="important">         
             <div id="valider"> Valider </div>`;
}

async function affichageGeneriqueTache(e, nomTache, description, importante) {
    try {
        const divTache = document.createElement('div');
        divTache.id = "div-tache";
        divTache.dataset.id = e;
        divTache.innerHTML = `
            <strong class="nomDeLaTache">${nomTache}</strong>
<!--            <br>-->
            <div class="descriptionTache">${description}</div>
            <br>
            ${importante ? '<div class="iconeImportante">Importante</div>'
            : ''}
            <div class="moins"> Terminé </div>`;

        divTache.querySelector('.moins').addEventListener('click', async function () {
            await window.db.supprimerTache(e);
            divTache.remove();
        });

        listeTaches.appendChild(divTache);
        cacher(creationTache);
    } catch (err) {
        console.error('Erreur:', err);
    }
}


async function ajouterNouvelleTache() {
    const nomTache = document.getElementById("nomTache").value;
    const description = document.getElementById("descTache").value;
    const importante = document.getElementById("important").checked;

    try {
        const id = await window.db.ajouterTache(nomTache, description, importante);
        await affichageGeneriqueTache(id, nomTache, description, importante);
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
            affichageGeneriqueTache(tache.id, tache.nom, tache.description, tache.importante);
        });
    } catch (err) {
        console.error('Erreur chargement des tâches:', err);
    }
});