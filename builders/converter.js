const fs = require('fs')
const { GuildID } = require('../config.json')
const embed = require('./embed')
const { write, getLate } = require('./fs')

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
                const data = JSON.parse(getLate(number))

                const split = data.name.split(" ")

                if (split[0] == "Unknown" && data.channel != null) {
                    write(data.number, name, data.sensetive, data.channel, data.group, data.remote)
                    const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel)
                    channel.setName(name)
                    embed.linking(name, channel)
                }
            }
        }, 5000)
    }
}