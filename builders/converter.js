const fs = require('fs')
const { GuildID } = require('../config.json')
const embed = require('./embed')
const { search } = require('./numtodata')

module.exports = {

    convMessage(message) {
        message.toString()
        if (!message) {
            return "none"
        } else {
            return message
        }
    },

    async MsgToName(msg, client) {

        if (msg.author != null) return

        const numberS = msg.id.remote.split("@")
        const number = numberS[0]

        const contact = await msg.getContact()
        const name = contact.name

        setTimeout(function () {

            if (fs.existsSync(`./users/${number}.json`)) {
                const data = JSON.parse(fs.readFileSync(`./users/${number}.json`, { encoding: 'utf8' }))

                const split = data.name.split(" ")
                

                if (split[0] == "Unknown" && data.channel != null) {
                    const NewDataObj = { number: data.number, name: name, sensetive: data.sensetive, channel: data.channel, group: data.group, remote: data.remote }
                    fs.writeFile(`./users/${data.number}.json`, JSON.stringify(NewDataObj), err => { return err })

                    const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel)
                    channel.setName(name)
                    embed.linking(name, channel)
                }


            }

        }, 5000)

    }

}