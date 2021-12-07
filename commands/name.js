const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('fs')
const embed = require('../builders/embed.js')
const { getLate, write } = require("../builders/fs.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("name")
        .setDescription("Set the name of a contact.")
        .addChannelOption((option => option
            .setName("number")
            .setDescription("z.B. #49123456789")
            .setRequired(true)))
        .addStringOption((option => option
            .setName("name")
            .setDescription("z.B. Raihner Zufall")
            .setRequired(true)))
    ,

    async execute(interaction) {

        const searchID = interaction.options.getChannel("number")
        const name = interaction.options.getString("name")

        const users = fs.readdirSync('./users').filter(file => file.endsWith('.json'));

        users.forEach((user) => {
            const data = JSON.parse(getLate(user))
            if (data.channel == searchID) {

                write(data.number, name, data.sensetive, data.channel, data.group, data.remote)
                interaction.guild.channels.cache.find(element => element == data.channel).setName(name)
                embed.reply("Erfolg", "Der Name wurde erfolgrauch gesetzt!", interaction, false, 5)
                return
            }
        })

    }
}