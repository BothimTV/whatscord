const { GuildID, SensetiveChannelID, GroupParentID, UserParentID } = require("../config.json");
const fs = require('fs')
const who = require('../builders/numtodata');
const embed = require("../builders/embed");
const { MessageMedia } = require("whatsapp-web.js");
const request = require('request')

module.exports = {

    revice(msg, client) {

        who.search(msg)

        setTimeout(function () {

            const data = JSON.parse(who.search(msg))

            const number = data.number
            const name = data.name
            const sensetive = data.sensetive
            const numchannel = data.channel
            const group = data.group
            const remote = data.remote

            const message = msg.body.toString().slice(0, 1020)
            if (!message) return

            if (sensetive) {
                const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == SensetiveChannelID)
                embed.sendU(`(Sensetive Message)\nMessage is from +${number}`, channel)
                return
            }

            if (numchannel == null && group) {
                client.guilds.cache.find(element => element == GuildID).channels.create(number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(GroupParentID)
                    const NewDataObj = { number: number, name: name, sensetive: sensetive, channel: channel.id, group: group, remote: remote }
                    fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })
                    embed.sendG(message, channel, msg.author)
                })
            } else if (numchannel == null && !group) {
                client.guilds.cache.find(element => element == GuildID).channels.create(number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(UserParentID)
                    const NewDataObj = { number: number, name: name, sensetive: sensetive, channel: channel.id, group: group, remote: remote }
                    fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })
                    embed.sendU(message, channel)
                })
            }

            else if (numchannel != null && group) {
                embed.sendG(message, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == numchannel), msg.author, client)
            } else if (numchannel != null && !group) {
                embed.sendU(message, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == numchannel))
            }
        }, 2000)
    },

    async reviceFile(msg, message, file, client) {

        who.search(msg)

        setTimeout(function () {

            const data = JSON.parse(who.search(msg))
            const number = data.number
            const name = data.name
            const sensetive = data.sensetive
            const numchannel = data.channel
            const group = data.group
            const remote = data.remote

            if (sensetive) {
                const channel = client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == SensetiveChannelID)
                embed.sendU(`(Sensetive Message with Attachment)\nMessage is from +${number}`, channel)
                return
            }

            if (numchannel == null && group) {
                client.guilds.cache.find(element => element == GuildID).channels.create(number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(GroupParentID)
                    const NewDataObj = { number: number, name: name, sensetive: sensetive, channel: channel.id, group: group, remote: remote }
                    fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })
                    embed.sendGf(message, file, channel, msg.author)
                })
            } else if (numchannel == null && !group) {
                client.guilds.cache.find(element => element == GuildID).channels.create(number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(UserParentID)
                    const NewDataObj = { number: number, name: name, sensetive: sensetive, channel: channel.id, group: group, remote: remote }
                    fs.writeFile(`./users/${number}.json`, JSON.stringify(NewDataObj), err => { return err })
                    embed.sendUf(message, file, channel)
                })
            }

            else if (numchannel != null && group) {
                embed.sendGf(message, file, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == numchannel), msg.author, client)
            } else if (numchannel != null && !group) {
                embed.sendUf(message, file, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == numchannel))
            }
        }, 2000)
    },

    send(msg, waClient) {
        const searchID = msg.channel.id
        const message = msg.content.toString()

        const users = fs.readdirSync('./users').filter(file => file.endsWith('.json'));

        if (!message) {

            const attachments = msg.attachments

            users.forEach((user) => {
                const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))
                if (data.channel == searchID) {
                    attachments.forEach((attachment => {

                        const Ende = attachment.name.split(".")
                        const ende = Ende[1]

                        request(attachment.attachment).pipe(fs.createWriteStream(`./download/discord/attachment.${ende}`))
                        setTimeout(function () {
                            waClient.sendMessage(data.remote, MessageMedia.fromFilePath(`./download/discord/attachment.${ende}`));
                        }, 1000)
                    })
                    )
                    return
                }
            })
            return
        }

        users.forEach((user) => {
            const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))
            if (data.channel == searchID) {
                waClient.sendMessage(data.remote, message);
                return
            }
        })
    }
}