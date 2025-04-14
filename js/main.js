// main.js

// Modules pour la gestion de l'appli et la création de la BrowserWindow native browser window
// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('main.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the taches database.');
});


db.run(`
    CREATE TABLE IF NOT EXISTS taches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        description TEXT,
        importante INTEGER DEFAULT 0
    )
`);

 
ipcMain.handle('ajouter-tache', async (event, { nom, description, importante }) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO taches (nom, description, importante) VALUES (?, ?, ?)',
            [nom, description, importante ? 1 : 0],
            function(err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
});

ipcMain.handle('charger-taches', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM taches', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
});

ipcMain.handle('supprimer-tache', async (event, id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM taches WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
});

const createWindow = () => {
    // Création de la browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // et chargement de l'index.html de l'application.
    mainWindow.loadFile('index.html')

    // Ouvrir les outils de développement.
    // mainWindow.webContents.openDevTools()
}

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // Sur macOS il est commun de re-créer une fenêtre  lors
        // du click sur l'icone du dock et qu'il n'y a pas d'autre fenêtre ouverte.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Dans ce cas il est courant
// que les applications et barre de menu restents actives jusqu'à ce que l'utilisateur quitte
// de manière explicite par Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Dans ce fichier vous pouvez inclure le reste du code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.