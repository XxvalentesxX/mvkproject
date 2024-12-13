const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');
const Commands = require('./parts/Commands');
const Events = require('./parts/Events');
const Interactions = require('./parts/Interactions');
const Slashs = require('./parts/Slashs');

class Load {
    static createTable() {
        return new Table({
            head: [
                chalk.bold.white('Name'),
                chalk.bold.white('Type'),
                chalk.bold.white('Status')
            ],
            colWidths: [15, 15, 15],
            style: {
                head: ['bold'],
                border: ['brightWhite'],
                compact: false,
                'padding-left': 1,
                'padding-right': 1
            },
            chars: {
                top: '─',
                'top-mid': '┬',
                'top-left': '╭',
                'top-right': '╮',
                bottom: '─',
                'bottom-mid': '┴',
                'bottom-left': '╰',
                'bottom-right': '╯',
                left: '│',
                'left-mid': '│',
                right: '│',
                'right-mid': '│',
                middle: '│'
            }
        });
    }

    static ensureDirectories(baseDir, subDirs = []) {
        if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir, { recursive: true });
            console.log(chalk.green(`Created base directory: ${baseDir}`));
        }

        subDirs.forEach(dir => {
            const fullPath = path.join(baseDir, dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(chalk.green(`Created directory: ${fullPath}`));
            }
        });
    }

    static ensurePingCommand(directory) {
        const pingFilePath = path.join(directory, 'ping.js');

        if (!fs.existsSync(pingFilePath)) {
            const clientFile = path.relative(directory, require.main.filename);
            const pingCommandContent = `const client = require('${clientFile}');

module.exports = {
    name: 'ping',
    async code(message) {
        message.reply('Pong! (aqui el ping)ms');
    }
};
`;
            fs.writeFileSync(pingFilePath, pingCommandContent);
            console.log(chalk.green(`Created default command: ${pingFilePath}`));
        }
    }

    static ensureClientExported() {
        const clientPath = require.main.filename;

        if (fs.existsSync(clientPath)) {
            const clientContent = fs.readFileSync(clientPath, 'utf-8');

            if (!clientContent.includes('module.exports = client;')) {
                fs.appendFileSync(clientPath, '\nmodule.exports = client;\n');
                console.log(chalk.green(`Added client export to ${clientPath}`));
            }
        }
    }

    static async Commands(directory, client) {
        this.ensureDirectories(directory);
        this.ensurePingCommand(directory);
        this.ensureClientExported();

        const table = this.createTable();
        const results = await Commands(directory, client);

        results.loaded.forEach(item => {
            table.push([
                chalk.white(item),
                chalk.bold.gray('Command'),
                chalk.bold.green('✓ Success')
            ]);
        });

        results.errors.forEach(error => {
            table.push([
                chalk.white(error.file || 'Unknown'),
                chalk.bold.gray('Command'),
                chalk.bold.red(`✘ ${error.error}`)
            ]);
        });

        console.log(chalk.bold.blue('Commands Loaded:'));
        console.log(table.toString());
    }

    static async Events(directory, client) {
        this.ensureDirectories(directory);
        const table = this.createTable();
        const results = await Events(directory, client);

        results.loaded.forEach(item => {
            table.push([
                chalk.white(item),
                chalk.bold.gray('Event'),
                chalk.bold.green('✓ Success')
            ]);
        });

        results.errors.forEach(error => {
            table.push([
                chalk.white(error.file || 'Unknown'),
                chalk.bold.gray('Event'),
                chalk.bold.red(`✘ ${error.error}`)
            ]);
        });

        console.log(chalk.bold.blue('Events Loaded:'));
        console.log(table.toString());
    }

    static async Interactions(directory, client) {
        this.ensureDirectories(directory, ['buttons', 'menus']);
        const table = this.createTable();
        const results = await Interactions(directory, client);

        results.loaded.forEach(item => {
            table.push([
                chalk.white(item),
                chalk.bold.gray('Interaction'),
                chalk.bold.green('✓ Success')
            ]);
        });

        results.errors.forEach(error => {
            table.push([
                chalk.white(error.file || 'Unknown'),
                chalk.bold.gray('Interaction'),
                chalk.bold.red(`✘ ${error.error}`)
            ]);
        });

        console.log(chalk.bold.blue('Interactions Loaded:'));
        console.log(table.toString());
    }

    static async Slashs(directory, client) {
        this.ensureDirectories(directory);
        const table = this.createTable();
        const results = await Slashs(directory, client);

        results.loaded.forEach(item => {
            table.push([
                chalk.white(item),
                chalk.bold.gray('Slash Command'),
                chalk.bold.green('✓ Success')
            ]);
        });

        results.errors.forEach(error => {
            table.push([
                chalk.white(error.file || 'Unknown'),
                chalk.bold.gray('Slash Command'),
                chalk.bold.red(`✘ ${error.error}`)
            ]);
        });

        console.log(chalk.bold.blue('Slash Commands Loaded:'));
        console.log(table.toString());
    }

    static async All(directory, client) {
        this.ensureDirectories(directory, ['commands', 'events', 'slashs', 'interactions/buttons', 'interactions/menus']);
        this.ensurePingCommand(path.join(directory, 'commands'));
        this.ensureClientExported();

        const table = this.createTable();

        console.log(chalk.bold.blue('Starting full load process...'));

        const loaders = [
            { type: 'Command', method: Commands },
            { type: 'Event', method: Events },
            { type: 'Interaction', method: Interactions },
            { type: 'Slash Command', method: Slashs }
        ];

        for (const loader of loaders) {
            const results = await loader.method(directory, client);

            results.loaded.forEach(item => {
                table.push([
                    chalk.white(item),
                    chalk.bold.gray(loader.type),
                    chalk.bold.green('✓ Success')
                ]);
            });

            results.errors.forEach(error => {
                table.push([
                    chalk.white(error.file || 'Unknown'),
                    chalk.bold.gray(loader.type),
                    chalk.bold.red(`✘ ${error.error}`)
                ]);
            });
        }

        console.log(table.toString());
        console.log(chalk.bold.green('All components loaded successfully.'));
    }
}

module.exports = Load;
