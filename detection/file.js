const fs = require('fs')
const embed = require('../builders/embed')
const { GuildID, LogChannel } = require('../config')

module.exports = {

    users(client) {

        const users = fs.readdirSync('./users').filter(file => file.endsWith('.json'));
        const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == LogChannel)

        users.forEach((user) => {

            try {
            const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))
            const Channel = data.channel.id
            const Remote = data.remote.toString()

            } catch (err) {
                fs.unlink('./users/' + user, err => { return err })

                if (err == "SyntaxError: Unexpected end of JSON input") {
                    embed.debugErr(channel, "An corrupted file was detected!", "A self debug was activated!")
                } else if (err.startsWith("TypeError: Cannot read properties of null")) {
                    embed.debugErr(channel, "An corrupted file was detected! [MISSING: channelid and/or remoteid]", "A self debug was activated!")
                }else {
                    embed.debugErr(channel, err + "\nTo prevent chrashes, the file was deleted!\nName of the File: " + user, "This is an unknwon error, a self fix is not available!")
                }
            }
        })
    }
}