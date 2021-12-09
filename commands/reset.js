const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('fs')
const embed = require('../builders/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reset")
        .setDescription("Reset the whatsapp session.")
        .addBooleanOption((option => option
            .setName("confirm")
            .setDescription("Set this on true, to confirm reset")
            .setRequired(true)))
    ,

    async execute(interaction) {

        if (interaction.options.getBoolean("confirm")) {

            fs.unlink(`./session.json`, err => { return err })
            embed.reply("Success!", "The session was deleted successfully, you will have to relogin to use the system!\nAfter a restart this change will become active after a restart!", interaction, false, 0)

        } else {
            embed.reply("Error!", "You have to confirm to delete the session!", interaction, false, 0)
        }

    }
}