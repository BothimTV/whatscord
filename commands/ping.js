const { SlashCommandBuilder } = require("@discordjs/builders")
const embed = require('../builders/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check if the bot is online."),

    async execute(interaction) {
        embed.reply("Pong!", "The bot is online!",  interaction, false, 3)
    }
}