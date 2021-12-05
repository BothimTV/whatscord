# WhatsCord - Connect WhatsApp with Discord
A bot that connects your WhatsApp with a Discord bot!
This is my first public bot - its going to get better later!
It creates automaticly new channels for receved messages and more.

You can start the bot with `node main.js` - to get the slash commands use `node deploy-commands.js` (ONLY THE "ping" AND "name" COMMAND ARE WORKING)
IF THE CHANNEL NAME IS NOT UPDATING - WAIT 10 MIN AND TRY AGAIN!
IF YOU DELETE AN CHANNEL THE BOT WILL CRASH AT NEW MEEAGES TO THE CONTACT - TO FIX THAT, DELETE THE NUMBER(.json) UNDER "/users/number.json"!

                                                               Setup:
 
1. Create an empty Discord-server with these Channels (Not the "contact" and "group" channels ![image](https://user-images.githubusercontent.com/50715457/144756095-03d37d29-d295-4701-b22d-7dc72884c633.png)
2. Create a new Application on https://discord.com/developers
3. Get the Application ID: ![image](https://user-images.githubusercontent.com/50715457/144756186-8aba9ebd-8cfb-444e-a1a7-48e7c8c8274e.png)
4. Create the bot and get the Token: ![image](https://user-images.githubusercontent.com/50715457/144756266-12ebd9ff-c1b6-4898-baae-0e59fa4e184b.png)
5. Make sure you have taken these settings: ![image](https://user-images.githubusercontent.com/50715457/144756283-55bb617f-82dc-456e-b7aa-2410db353fab.png)
6. Invite the Bot using the URL Generator in the OAuth2 Tab (URL at the bottom): ![image](https://user-images.githubusercontent.com/50715457/144756303-2c106268-23a3-48f0-835e-f709aff300f7.png)
7. Get all Channel and the Guild ID (Group Category, Chat Category, Log Channel, Sensetive Channel)
8. Save All informations in the config.json
9. Install: discord.js, fs, request, whatsapp-web.js, node-cron, qrcode-terminal, @discordjs/rest, discord-api-types
10. Scan the QR Code from the console - enjoi!


WARNING - BETA BUILD - It may crash by spamming, etc.!
