const boutonPlus = document.getElementById("plus");
const listeTaches = document.getElementById("liste-tache")


boutonPlus.addEventListener("click", function () {
    listeTaches.innerHTML = `Nom de la tâche <input type="text" name="nomTache" id="nomTache" > 
                       Description de la tâche <input type="text" name="descTache" id="descTache">
                       Tâche importante <input type="checkbox" name="tacheImportante" id="important"> 
                        <input type="button" value="Valider" id="valider">`;

    const boutonValider = document.getElementById("valider");
    boutonValider.addEventListener("click", function () {

        let nomTache = document.getElementById("nomTache");
        let description = document.getElementById("descTache");
        let importante = document.getElementById("important");

        listeTaches.innerHTML = `${nomTache.value}<br>
                                ${description.value}`;

        if (importante.checked) {
            listeTaches.innerHTML += `<br> Tâche importante !`;
        }
    });
});