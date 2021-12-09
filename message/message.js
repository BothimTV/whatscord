const { GuildID, SensetiveChannelID } = require("../config.json");
const fs = require('fs')
const embed = require("../builders/embed");
const { MessageMedia } = require("whatsapp-web.js");
const request = require('request');
const { get } = require("../builders/fs");
const { createGroup, createChat, find } = require("../builders/channel");

module.exports = {

    revice(msg, client) {

        get(msg)

        setTimeout(function () {

            const data = JSON.parse(get(msg)) // get data

            const message = msg.body.toString().slice(0, 1020) // block discord char limit
            if (!message) return

            if (data.sensetive) {
                embed.sendU(`(Sensetive Message)\nMessage is from +${data.number}`, find(SensetiveChannelID, client))
                return
            }

            if (data.channel == null && data.group) { // message with file in group - new channel
                createGroup(client, JSON.parse(get(msg)), message, null, msg)
            } else if (data.channel == null && !data.group) { // message with file in chat - new channel
                createChat(client, JSON.parse(get(msg)), message, null, msg)
            } else if (data.channel != null && data.group) { // message with file in group
                embed.sendG(message, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel), msg.author, client)
            } else if (data.channel != null && !data.group) { // message with file in chat
                embed.sendU(message, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel))
            }
        }, 2000)
    },

    async reviceFile(msg, message, file, client) {

        get(msg) // debug lookup

        setTimeout(function () {
            const data = JSON.parse(get(msg)) // get data

            if (data.sensetive) {
                embed.sendU(`(Sensetive Message with Attachment)\nMessage is from +${data.number}`, find(SensetiveChannelID, client))
                return
            }

            if (data.channel == null && data.group) { // message with file in group - new channel
                createGroup(client, JSON.parse(get(msg)), message, file, msg)
            } else if (data.channel == null && !data.group) { // message with file in chat - new channel
                createChat(client, JSON.parse(get(msg)), message, file)
            } else if (data.channel != null && data.group) { // message with file in group
                embed.sendGf(message, file, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel), msg.author, client)
            } else if (data.channel != null && !data.group) { // message with file in chat
                embed.sendUf(message, file, client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == data.channel))
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
                            waClient.sendMessage(data.remote, MessageMedia.fromFilePath(`./download/discord/attachment.${ende}`), {"linkPreview": true})
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