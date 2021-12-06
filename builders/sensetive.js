const fs = require('fs');
const embed = require('../builders/embed');

module.exports = {

    write(searchID, sensetive, interaction) {
        try {

            const users = fs.readdirSync('./users').filter(file => file.endsWith('.json'));

            users.forEach((user) => {
                const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))
                if (data.channel == searchID) {

                    const data = JSON.parse(fs.readFileSync(`./users/${user}`, { encoding: 'utf8' }))

                    const NewDataObj = { number: data.number, name: data.name, sensetive: sensetive, channel: data.channel, group: data.group, remote: data.remote }

                    fs.writeFile(`./users/${user}`, JSON.stringify(NewDataObj), err => { return err })

                    embed.reply("Success", "The chat was set on: \`sensetive: " + sensetive + "\`", interaction, false, 5)

                    return
                }
            })
        } catch (err) {
            embed.reply("Error", "Something went wrong.", interaction, false, 5)
            console.log(err)
        }
    }

}