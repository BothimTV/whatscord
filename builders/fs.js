const fs = require('fs')

module.exports = {
    
    get(msg){
        const numberS = msg.id.remote.split("@")

        if (!fs.existsSync(`./users/${numberS[0]}.json`)) {
            if (msg.author == null) {
                const NewDataObj = { number: numberS[0], name: `Unknown (+${numberS[0]})`, sensetive: false, channel: null, group: false, remote: msg.id.remote }
                fs.writeFile(`./users/${numberS[0]}.json`, JSON.stringify(NewDataObj), err => { return err })
            } else {
                const NewDataObj = { number: numberS[0], name: `Unknown Group (+${numberS[0]})`, sensetive: false, channel: null, group: true, remote: msg.id.remote }
                fs.writeFile(`./users/${numberS[0]}.json`, JSON.stringify(NewDataObj), err => { return err })
            }
            setTimeout(function () {
                const data = fs.readFileSync(`./users/${numberS[0]}.json`, { encoding: 'utf8' })
                return data
            }, 500)
        } else {
            const data = fs.readFileSync(`./users/${numberS[0]}.json`, { encoding: 'utf8' })
            return data
        }
    },

    getLate(author1) {
        const author = author1.split("@")

        if (!fs.existsSync(`./users/${author[0]}.json`)) {

            const data = fs.readFileSync(`./users/unknown.json`, { encoding: 'utf8' })
            return data

        } else {
            const data = fs.readFileSync(`./users/${author[0]}.json`, { encoding: 'utf8' })
            return data
        }


    },

    remove(file) {
        fs.unlink(`./users/${file}`, err => { return err })
    },

    userList() {
        return fs.readdirSync('./users').filter(file => file.endsWith('.json'));
    },

    write(number, name, sensetive, channel, group, remote) {
        const NewDataObj = { number: number, name: name, sensetive: sensetive, channel: channel.id, group: group, remote: remote }
        fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })
    }

}