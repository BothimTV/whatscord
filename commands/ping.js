const { SlashCommandBuilder } = require("@discordjs/builders")
const embed = require('../builders/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Teste ob der Bot online ist."),

    async execute(interaction) {
        embed.reply("Pong!", "Der Bot ist online!",  interaction, false, 3)
    }
}