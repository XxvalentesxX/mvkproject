const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');
const Commands = require('./parts/Commands');
const Events = require('./parts/Events');
const Interactions = require('./parts/Interactions');
const Slashs = require('./parts/Slashs');

class Load {
    static statusData = {
        loaded: [],
        errors: []
    };

    static configs = [];

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

    static async Commands(directory, client) {
        const results = await Commands(directory, client);

        results.loaded.forEach(item => {
            const commandName = path.basename(item, '.js');
            Load.configs.push({ name: commandName, type: 'Command', status: '✓ Success' });
            Load.statusData.loaded.push({ name: commandName, type: 'Command' });
        });

        results.errors.forEach(error => {
            const commandName = error.file ? path.basename(error.file, '.js') : 'Unknown';
            Load.configs.push({
                name: commandName,
                type: 'Command',
                status: `✘ ${error.error}`
            });
            Load.statusData.errors.push({
                name: commandName,
                type: 'Command',
                error: error.error
            });
        });
    }

    static async Events(directory, client) {
        const results = await Events(directory, client);

        results.loaded.forEach(item => {
            const eventName = path.basename(item, '.js');
            Load.configs.push({ name: eventName, type: 'Event', status: '✓ Success' });
            Load.statusData.loaded.push({ name: eventName, type: 'Event' });
        });

        results.errors.forEach(error => {
            const eventName = error.file ? path.basename(error.file, '.js') : 'Unknown';
            Load.configs.push({
                name: eventName,
                type: 'Event',
                status: `✘ ${error.error}`
            });
            Load.statusData.errors.push({
                name: eventName,
                type: 'Event',
                error: error.error
            });
        });
    }

    static async Interactions(directory, client) {
        const results = await Interactions(directory, client);

        results.loaded.forEach(item => {
            const fileName = typeof item === 'string' ? item : item.file;
            const fileType = fileName.includes('buttons') ? 'Interaction/Button' : 'Interaction/Menu';
            const interactionName = path.basename(fileName, '.js');

            Load.configs.push({ name: interactionName, type: fileType, status: '✓ Success' });
            Load.statusData.loaded.push({ name: interactionName, type: fileType });
        });

        results.errors.forEach(error => {
            const interactionName = error.file ? path.basename(error.file, '.js') : 'Unknown';
            Load.configs.push({
                name: interactionName,
                type: 'Interaction',
                status: `✘ ${error.error}`
            });
            Load.statusData.errors.push({
                name: interactionName,
                type: 'Interaction',
                error: error.error
            });
        });
    }

    static async Slashs(directory, client) {
        const results = await Slashs(directory, client);

        results.loaded.forEach(item => {
            const slashCommandName = path.basename(item, '.js');
            Load.configs.push({ name: slashCommandName, type: 'Slash Command', status: '✓ Success' });
            Load.statusData.loaded.push({ name: slashCommandName, type: 'Slash Command' });
        });

        results.errors.forEach(error => {
            const slashCommandName = error.file ? path.basename(error.file, '.js') : 'Unknown';
            Load.configs.push({
                name: slashCommandName,
                type: 'Slash Command',
                status: `✘ ${error.error}`
            });
            Load.statusData.errors.push({
                name: slashCommandName,
                type: 'Slash Command',
                error: error.error
            });
        });
    }

    static async All(directory, client) {
        Load.ensureDirectories(directory, ['commands', 'events', 'slashs', 'interactions/buttons', 'interactions/menus']);
    
        await Promise.all([
            Load.Commands(path.join(directory, 'commands'), client),
            Load.Events(path.join(directory, 'events'), client),
            Load.Interactions(path.join(directory, 'interactions'), client),
            Load.Slashs(path.join(directory, 'slashs'), client)
        ]);
    }
    

    static Status() {
        const table = Load.createTable();

        Load.statusData.loaded.forEach(item => {
            table.push([
                chalk.white(item.name),
                chalk.bold.gray(item.type),
                chalk.bold.green('✓ Success')
            ]);
        });

        Load.statusData.errors.forEach(error => {
            table.push([
                chalk.white(error.name),
                chalk.bold.gray(error.type),
                chalk.bold.red(`✘ ${error.error}`)
            ]);
        });

        console.log(table.toString());
        console.log(chalk.bold.green('✓ Todo ha sido cargado correctamente.'));
    }
}

module.exports = Load;
