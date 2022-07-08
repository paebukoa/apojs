const Compiler = require("./compiler");
const Properties = require("./properties")
const { readdirSync } = require("fs");

class Utils {
    static unescape(str) {
        return str
        .replaceAll("#", "%TAG%")
        .replaceAll("(", "%LP%")
        .replaceAll("|", "%BAR%")
        .replaceAll(")", "%RP%")
        .replaceAll(",", "%COMMA%")
        .replaceAll("{", "%LB%")
        .replaceAll("}", "%RB%")
        .replaceAll("!", "%EXC%")
        .replaceAll("=", "%EQUAL%")
        .replaceAll(">", "%GREATER%")
        .replaceAll("<", "%SMALLER%")
        .replaceAll("&", "%AND%")
        .replaceAll("?", "%INT%")
        .replaceAll("/", "%SLASH%")
    }

    static escape(str) {
        return str
        .replaceAll("%TAG%", "#")
        .replaceAll("%LP%", "(")
        .replaceAll("%BAR%", "|")
        .replaceAll("%RP%", ")")
        .replaceAll("%COMMA%", ",")
        .replaceAll("%LB%", "{")
        .replaceAll("%RB%", "}")
        .replaceAll("%EXC%", "!")
        .replaceAll("%EQUAL%" , "=")
        .replaceAll("%GREATER%", ">")
        .replaceAll("%SMALLER%", "<")
        .replaceAll("%AND%", "&")
        .replaceAll("%INT%", "?")
        .replaceAll("%SLASH%", "/")
    }
    static parseCommand(d, command) {
        const table = new AsciiTable()

        let {type = 'default', ignorePrefix = false, executeOnDm = false, enableComments = false} = command;
        // exporting optional properties from command

        if (!['string', 'undefined', undefined].includes(typeof command.name)) errorRow('invalid name')
        else if (typeof command.code !== 'string') errorRow('invalid code')
        else if (typeof type !== 'string' || !d.commandManager[type]) errorRow('invalid type')
        else {
            function* genId() {
                let id = 0

                while (true) {
                    id++
                    yield id
                }
            }

            let id = genId().next().value

            while(d.commandManager[type].get(id) != undefined) id = id.next().value
            // generating a new id

            let compiledCode = Compiler.compile(d, command.code)
            command.code = compiledCode

            data.commandManager[type].set(command.name ? command.name.toLowerCase() : id, {...command, type, ignorePrefix, executeOnDm, enableComments})

            table.addRow(
                command.name ?? 'unknown',
                type,
                'OK',
                'none'
            )
        }

        function errorRow(err) {
            table.addRow(
                command.name ?? 'unknown',
                type,
                'ERROR',
                err
            )
        }
    }

    /**
     * Returns an object duplicated.
     * @param {object} obj the object to duplicate
     */
    static duplicate(obj) {
        let duplicated = {};

        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                let value = obj[prop]
                duplicated[prop] = value;
            }
            
        }
    }

    static getDirFiles(path) {
        let files = readdirSync(files, {withFileTypes: true})

        let types = {
            files: files.filter(file => file.isFile()),
            dirs: files.filter(file => file.isDirectory())
        };

        for (let dir of types.dirs) {
            let dirFiles = this.getFiles(dir.name);
            types.files.push(...dirFiles);
        };

        return types.files;
    };

    /**
     * Gets a property from an object.
     * @param {string} type the object type
     * @param {object} obj the object
     * @param {string} prop the property to return
     */

    static getProperty(type, obj, prop) {
        return Properties[type](obj, prop)
    }
}