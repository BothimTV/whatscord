const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('fs')
const embed = require('../builders/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("name")
        .setDescription("Setzte den namen einer Nummer.")
        .addChannelOption((option => option
            .setName("nummer")
            .setDescription("z.B. #49123456789")
            .setRequired(true)))
        .addStringOption((option => option
            .setName("namen")
            .setDescription("z.B. Raihner Zufall")
            .setRequired(true)))
    ,

    async execute(interaction) {

        const searchID = interaction.options.getChannel("nummer")
        const name = interaction.options.getString("namen")

        try {

            const users = fs.readdirSync('./users').filter(file => file.endsWith('.json'));

            users.forEach((user) => {
                const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))
                if (data.channel == searchID) {

                    const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))

                    const NewDataObj = { number: data.number, name: name, sensetive: data.sensetive, channel: data.channel, group: data.group, remote: data.remote }

                    interaction.guild.channels.cache.find(element => element == data.channel).setName(name)
                    fs.writeFile(`./users/${user}`, JSON.stringify(NewDataObj), err => { return err })

                    embed.reply("Erfolg", "Der Name wurde erfolgrauch gesetzt!", interaction, false, 5)

                    return
                }
            })

        } catch (err) {
            embed.reply("Fehler", "Ein Fehler ist aufgetreten!", interaction, false, 5)
            console.log(err)
        }

    }
}