const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../data.db'));

// Initialisation de la base de données
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS taches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        description TEXT,
        importante INTEGER
    )`);
});

const dbOperations = {
    ajouterTache: (nom, description, importante) => {
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
    },

    supprimerTache: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM taches WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    chargerTaches: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM taches', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = dbOperations;