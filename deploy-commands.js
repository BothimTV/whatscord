const { token, GuildID, ApplicationID } = require("./config.json");
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9');
const commands = []

module.exports = {

    async sync() {

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        commandFiles.forEach((commandFile) => {
            const command = require(`./commands/${commandFile}`)
            commands.push(command.data.toJSON())
        })

        const restClient = new REST({ version: "9" }).setToken(token)

        restClient.put(Routes.applicationGuildCommands(ApplicationID, GuildID),
            { body: commands })
            .catch(console.error)


    }
}