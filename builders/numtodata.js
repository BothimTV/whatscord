const fs = require('fs')

module.exports = {

    search(msg) {
        const numberS = msg.id.remote.split("@")
        const number = numberS[0]

        if (!fs.existsSync(`./users/${number}.json`)) {

            if (msg.author == null) {

                const NewDataObj = { number: number, name: `Unknown (+${number})`, sensetive: false, channel: null, group: false, remote: msg.id.remote }
                fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })

            } else {

                const NewDataObj = { number: number, name: `Unknown Group (ID: ${number})`, sensetive: false, channel: null, group: true, remote: msg.id.remote }
                fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })

            }

            setTimeout(function () {

                const data = fs.readFileSync(`./users/${number}.json`, { encoding: 'utf8' })
                return data

            }, 500)

        } else {
            const data = fs.readFileSync(`./users/${number}.json`, { encoding: 'utf8' })
            return data
        }
    },

    lateSearch(authorRAW) {
        const authorS = authorRAW.split("@")
        const author = authorS[0]

        if (!fs.existsSync(`./users/${author}.json`)) {

            const NewDataObj = { number: author, name: `Unknown (+${author})`, sensetive: false, channel: null, group: false, remote: null }
            return NewDataObj

        } else {
            const data = fs.readFileSync(`./users/${author}.json`, { encoding: 'utf8' })
            return data
        }


    }

}