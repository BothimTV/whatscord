const { SlashCommandBuilder } = require("@discordjs/builders")
const { write } = require("../builders/sensetive.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sensitive")
        .setDescription("Add or remove a number from the hidden recieve message list (sensetive).")
        .addSubcommand(subCommand => subCommand
            .setName("add")
            .setDescription("Add a user.")
            .addChannelOption((option => option
                .setName("user-add")
                .setDescription("z.B. #49123456789")
                .setRequired(true))
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName("remove")
            .setDescription("Remove a user.")
            .addChannelOption((option => option
                .setName("user-remove")
                .setDescription("z.B. #49123456789")
                .setRequired(true))
            )
        )
    ,

    async execute(interaction) {

        const subCommand = interaction.options.getSubcommand()

        if (subCommand == "add") {
            const searchID = interaction.options.getChannel("user-add")
            write(searchID, true, interaction)
        } else {
            const searchID = interaction.options.getChannel("user-remove")
            write(searchID, false, interaction)
        }
    }
}

