const { write } = require('../builders/fs')
const embed = require('./embed')
const { UserParentID, GroupParentID, GuildID } = require('../config.json')

module.exports = {


    createGroup(client, data, message, file, msg) { 
    
        client.guilds.cache.find(element => element == GuildID).channels.create(data.number, {
            type: "GUILD_TEXT"
        }).then((channel) => {
            channel.setParent(GroupParentID)
            write(data.number, data.name, data.sensetive, channel.id, data.group, data.remote)
            if (file) {
                embed.sendGf(message, file, channel, msg.author)
            } else {
                embed.sendG(message, channel, msg.author)
            }
        })
    },

    createChat(client, data, message, file, msg) { 
    
        client.guilds.cache.find(element => element == GuildID).channels.create(data.number, {
            type: "GUILD_TEXT"
        }).then((channel) => {
            channel.setParent(UserParentID)
            write(data.number, data.name, data.sensetive, channel.id, data.group, data.remote)
            if (file) {
                embed.sendUf(message, file, channel, msg.author)
            } else {
                embed.sendU(message, channel, msg.author)
            }
        })
    },

    find(searchID, client) {
        return client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == searchID) 
    }


}