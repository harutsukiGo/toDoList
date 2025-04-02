// preload.js

// Toutes les API Node.js sont disponibles dans le processus de préchargement.
// Il a la même sandbox qu'une extension Chrome.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
    ajouterTache: (nom, description, importante) =>
        ipcRenderer.invoke('ajouter-tache', { nom, description, importante }),

    chargerTaches: () =>
        ipcRenderer.invoke('charger-taches'),

    supprimerTache: (id) =>
        ipcRenderer.invoke('supprimer-tache', id)
});