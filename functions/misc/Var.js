const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(process.cwd(), 'variables');

class Var {
    static Type = {
        User: 0,
        Server: 15,
        Channel: 20,
        Value: 99
    };

    static initializeDirectories() {
        const subdirs = ['user', 'server', 'channel'];
        if (!fs.existsSync(BASE_DIR)) {
            fs.mkdirSync(BASE_DIR);
        }
        subdirs.forEach(subdir => {
            const dirPath = path.join(BASE_DIR, subdir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
        });
    }

    static Create({ name, value }) {
        Var.initializeDirectories();

        const dirs = ['user', 'server', 'channel'];
        dirs.forEach(dir => {
            const dirPath = path.join(BASE_DIR, dir);
            const filePath = path.join(dirPath, `${name}.json`);
            if (!fs.existsSync(filePath)) {
                const content = { value };
                fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
            }
        });
    }

    static Exists({ name }) {
        Var.initializeDirectories();

        const dirs = ['user', 'server', 'channel'];
        return dirs.some(dir => {
            const filePath = path.join(BASE_DIR, dir, `${name}.json`);
            return fs.existsSync(filePath);
        });
    }

    static Get({ name, type, id }) {
        Var.initializeDirectories();

        const dir = Var.getDirectoryFromType(type);
        const filePath = path.join(BASE_DIR, dir, `${name}.json`);
        if (!fs.existsSync(filePath)) {
            console.error('Variable does not exist.');
            return null;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (type === Var.Type.Value) return data.value;

        if (!data[`${dir}ID`] || !data[`${dir}ID`][id]) {
            return data.value;
        }
        return data[`${dir}ID`][id];
    }

    static Set({ name, value, type, id }) {
        Var.initializeDirectories();

        if (![Var.Type.User, Var.Type.Server, Var.Type.Channel, Var.Type.Value].includes(type)) {
            console.error('Invalid type.');
            return;
        }

        const dir = Var.getDirectoryFromType(type);
        const filePath = path.join(BASE_DIR, dir, `${name}.json`);
        if (!fs.existsSync(filePath)) {
            console.error('Variable does not exist.');
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (type === Var.Type.Value) {
            data.value = value;
        } else {
            if (!id) {
                console.error('ID is required for User, Server, or Channel types.');
                return;
            }
            data[`${dir}ID`] = data[`${dir}ID`] || {};
            data[`${dir}ID`][id] = value;
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    }

    static Reset({ name, type, id }) {
        Var.initializeDirectories();

        const dir = Var.getDirectoryFromType(type);
        const filePath = path.join(BASE_DIR, dir, `${name}.json`);
        if (!fs.existsSync(filePath)) {
            console.error('Variable does not exist.');
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!id || type === Var.Type.Value) return;
        if (data[`${dir}ID`] && data[`${dir}ID`][id]) {
            delete data[`${dir}ID`][id];
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    }

    static Delete({ name }) {
        Var.initializeDirectories();

        const dirs = ['user', 'server', 'channel'];
        dirs.forEach(dir => {
            const filePath = path.join(BASE_DIR, dir, `${name}.json`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }

    static getDirectoryFromType(type) {
        switch (type) {
            case Var.Type.User:
                return 'user';
            case Var.Type.Server:
                return 'server';
            case Var.Type.Channel:
                return 'channel';
            default:
                console.error('Invalid type.');
                return null;
        }
    }
}

module.exports = Var;
