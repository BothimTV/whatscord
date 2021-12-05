const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const who = require('./numtodata')
const { GuildID, SensetiveChannelID, GroupParentID, UserParentID } = require("../config.json");

module.exports = {

    reply(Name, Value, interaction, cleanup, delay) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .addFields([
                        {
                            name: `${Name}`,
                            value: `${Value}`
                        }
                    ])
            ]
        ,  ephemeral: true})
        if (cleanup) { setTimeout(function () { interaction.deleteReply() }, delay * 1000) }
    },


    editReply(Name, Value, interaction, cleanup, delay) {

        interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .addFields([
                        {
                            name: `${Name}`,
                            value: `${Value}`
                        }

                    ])
            ]
        })

        if (cleanup) { setTimeout(function () { interaction.deleteReply() }, delay * 1000) }
    },

    debug(channel, state, lstate) {
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_PURPLE")
                    .addFields([
                        {
                            name: `State Changed:`,
                            value: `New State \`${state}\`, Old State: \`${lstate}\``
                        }
                    ])
                    .setTimestamp()
                    .setFooter("Using the system with changing states, may occur crashes!")
            ]
        })
    },

    sendU(value, channel) {
        channel.send({
            embeds: [
                new MessageEmbed()
                    .addFields([
                        {
                            name: `Message:`,
                            value: `${value}`
                        }
                    ])
                    .setTimestamp()
            ]
        })
    },

    linking(name, channel) {
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("GREEN")
                    .addFields([
                        {
                            name: `Linking Succeded:`,
                            value: `${channel} <-> ${name}`
                        }
                    ])
                    .setTimestamp()
                    .setFooter("Bot by @Bothim_TV", "https://cdn.discordapp.com/avatars/444476258798010368/ee29cad9ddb317e0bcd12c5458620068.png?size=4096")
            ]
        }).then((msg) => {
            msg.pin()
            channel.setTopic(` - ${channel} <-> ${name} - \nBot By <@444476258798010368>`)
        })
    },

    sendG(value, channel, author) {
    
        who.lateSearch(author)

        setTimeout(function () {

            const data = JSON.parse(who.lateSearch(author))

            channel.send({
                embeds: [
                    new MessageEmbed()
                        .addFields([
                            {
                                name: `From: ${data.name}`,
                                value: `${value}`
                            }
                        ])
                        .setTimestamp()
                ]
            })

            if (data.channel == null) {
                channel.guild.channels.create(data.number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(UserParentID);
                    const NewDataObj = { number: data.number, name: data.name, sensetive: data.sensetive, channel: channel.id, group: data.group }
                    fs.writeFile(`./users/${data.number}.json`, JSON.stringify(NewDataObj), err => { return err })
                })
            }

        }, 200)
    },

    sendUf(value, file, channel) {

        if (value == "none") {
            channel.send({files: ["./download/" + file]})
            return
        }

        channel.send({
            embeds: [
                new MessageEmbed()
                    .addFields([
                        {
                            name: `Message:`,
                            value: `${value}`
                        }
                    ])
                    .setTimestamp()
            ], files: ["./download/" + file]
        })
    },

    sendGf(value, file, channel, author) {
    
        who.lateSearch(author)

        setTimeout(function () {

            const data = JSON.parse(who.lateSearch(author))

            if (data.channel == null && data.remote != null) {
                channel.guild.channels.create(data.number, {
                    type: "GUILD_TEXT"
                }).then((channel) => {
                    channel.setParent(UserParentID);
                    const NewDataObj = { number: data.number, name: data.name, sensetive: data.sensetive, channel: channel.id, group: data.group, remote: data.remote }
                    fs.writeFile(`./users/${data.number}.json`, JSON.stringify(NewDataObj), err => { return err })
                })
            }

            if (value == "none") {
                channel.send({files: ["./download/" + file]})
                return
            }

            channel.send({
                embeds: [
                    new MessageEmbed()
                        .addFields([
                            {
                                name: `From: ${data.name}`,
                                value: `${value}`
                            }
                        ])
                        .setTimestamp()
                ], files: ["./download/" + file]
            })

        }, 200)
    }

}