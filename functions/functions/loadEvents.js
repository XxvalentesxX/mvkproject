const fs = require('fs');
const path = require('path');

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
                    eventModule(client);
                }
            }
        });
    }

    loadFromDir(absolutePath);
}

module.exports = loadEvents;
