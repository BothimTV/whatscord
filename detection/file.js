const { find } = require('../builders/channel');
const { debugErr } = require('../builders/embed');
const { getLate, remove, userList } = require('../builders/fs');
const { LogChannel } = require('../config')

module.exports = {

    users(client) {

        const users = userList()
        const channel = find(LogChannel, client)

        users.forEach((user) => {

            try {
            const data = JSON.parse(getLate(user))
            const Channel = data.channel.id
            const Remote = data.remote.id

            } catch (err) {
                remove(user)

                if (err == "SyntaxError: Unexpected end of JSON input") {
                    debugErr(channel, "An corrupted file was detected!", "A self debug was activated!")
                } else if (err.startsWith("TypeError: Cannot read properties of null")) {
                    debugErr(channel, "An corrupted file was detected! [MISSING: channelid and/or remoteid]", "A self debug was activated!")
                }else {
                    debugErr(channel, err + `\nTo prevent chrashes, the file was deleted!\nName of the File:  ${user}`, `This is an unknwon error, a self fix is not available!`)
                }
            }
        })
    }
}