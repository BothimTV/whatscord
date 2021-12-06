console.clear()
console.log("[SYSTEM] Loading...");
var qrcode = require('qrcode-terminal');
const { Client, Collection } = require("discord.js");
const { token, GuildID, LogChannel } = require("./config.json");
const fs = require('fs');
const waclient = require("./waclient");
const message = require('./message/message');
const { convMessage, MsgToName } = require('./builders/converter');
var cron = require('node-cron');
const whatsapp = require('./detection/whatsapp');
const embed = require('./builders/embed');
const file = require('./detection/file');

const client = new Client({ intents: 32767 });
const waClient = waclient.create()

client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

waClient.on('qr', (qr) => {
    console.log("[WA-API] QR required")
    qrcode.generate(qr, { small: true });
    client.user.setActivity(`WhatsApp QR Code.`, {
        type: "WATCHING"
    })
});

waClient.on('ready', () => {
    console.log("[WA-API] Logged in.")
    client.user.setActivity(`WhatsApp.`, {type: "WATCHING"})
    const NewDataObj = { "state": "STARTED", "lstate": "OFFLINE" }
    fs.writeFile('./detection/laststate.json', JSON.stringify(NewDataObj), err => { return err })
    embed.debug(client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == LogChannel), "STARTED", "STARTING")
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName)
    if (command) {
        try {
            await command.execute(interaction, client);
        } catch (error) { console.log(error) }
    }
})

client.on("messageCreate", async (msg) => {
    if (msg.member.user.bot) return
    message.send(msg, waClient)
})

cron.schedule('*/4 * * * * *', async () => {
    const state = await waClient.getState()
    whatsapp.check(state, client)
});

cron.schedule('0 * * * * *', () => {
    file.users(client)
});


waClient.on('message', async (msg) => {
    if (msg.from === 'status@broadcast') return
    if (msg.hasMedia) {
        const media = await msg.downloadMedia()
        if (media) {
            if (media.mimetype == "image/jpeg") {
                fs.writeFile("./download/attachment.png", media.data, "base64", function (err) { return err });
                message.reviceFile(msg, convMessage(msg.body), "attachment.png", client)
            } else if (media.mimetype == "video/mp4") {
                fs.writeFile("./download/attachment.mp4", media.data, "base64", function (err) { return err });
                message.reviceFile(msg, convMessage(msg.body), "attachment.mp4", client)
            } else if (media.mimetype == "audio/ogg; codecs=opus") {
                fs.writeFile("./download/attachment.mp3", media.data, "base64", function (err) { return err });
                message.reviceFile(msg, convMessage(msg.body), "attachment.mp3", client)
            }
        }
    } else {
        message.revice(msg, client)
        MsgToName(msg, client)
    }
})

waClient.initialize();


waClient.on('disconnected', (reason) => {
    console.log("[WA-API] DISCONNECTED (" + reason + ")")
    whatsapp.check("DISCONNECTED (" + reason + ")", client)
    waClient.destroy();
    waClient.initialize();
  });

client.once('ready', () => {
    console.log(`[DC-API] Bot Logged in as ${client.user.tag}!`);
    client.user.setActivity(`WhatsApp CONNECTING.`, {type: "WATCHING"})
    embed.debug(client.guilds.cache.find(element => element == GuildID).channels.cache.find(element => element == LogChannel), "STARTING", "OFFLINE")
})

client.login(token);
