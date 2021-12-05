const { SlashCommandBuilder } = require("@discordjs/builders")
const embed = require('../builders/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sansetive")
        .setDescription("Füge oder Lösche einen Sensetive Nummer.")
        .addSubcommand(subCommand => subCommand
            .setName("add")
            .setDescription("Füge einen Benutzer zur Liste hinzu.")
            .addIntegerOption((option => option
                .setName("user-add")
                .setDescription("z.B. 49123456789")
                .setRequired(true))
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName("remove")
            .setDescription("Lösche eine Nummer von der Liste.")
            .addIntegerOption((option => option
                .setName("user-remove")
                .setDescription("z.B. 49123456789")
                .setRequired(true))
            )
            
        ),

    async execute(interaction) {
       
    }
}