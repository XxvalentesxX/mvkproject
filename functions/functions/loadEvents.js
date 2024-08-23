// loadEvents.js
const fs = require('fs');
const path = require('path');

/**
 * Carga todos los eventos desde una carpeta y los registra en el cliente de Discord.
 * @param {string} folderPath - Ruta de la carpeta que contiene los eventos.
 * @param {Client} client - Instancia del cliente de Discord.
 */
function loadEvents(folderPath, client) {
    const absolutePath = path.resolve(folderPath);

    function loadFromDir(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                loadFromDir(filePath);
            } else if (file.endsWith('.js')) {
                const eventModule = require(filePath);

                if (typeof eventModule === 'function') {
                    // Si el módulo exporta una función, la ejecutamos pasándole el cliente
                    eventModule(client);
                }
            }
        });
    }

    loadFromDir(absolutePath);
}

module.exports = loadEvents;