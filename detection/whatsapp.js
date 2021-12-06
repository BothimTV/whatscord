const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const { GuildID, LogChannel } = require('../config.json')
const embed = require('../builders/embed')

module.exports = {

    check(state, client) {

        const data = JSON.parse(fs.readFileSync('./detection/laststate.json', { encoding: 'utf8' }))
        const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == LogChannel)

        if (state == data.state) {
            const NewDataObj = { "state": state, "lstate": data.state }
            fs.writeFile('./detection/laststate.json', JSON.stringify(NewDataObj), err => { return err })
            return
        }

        if (state != data.state) {
            const NewDataObj = { "state": state, "lstate": data.state }
            fs.writeFile('./detection/laststate.json', JSON.stringify(NewDataObj), err => { return err })
            embed.debug(channel, state, data.state)
            return
        }

    }


}