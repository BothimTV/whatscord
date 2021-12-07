const { Client } = require('whatsapp-web.js');
const fs = require('fs')

module.exports = {

    create() {
        const SESSION_FILE_PATH = './session.json';
        let sessionData;
        if (fs.existsSync(SESSION_FILE_PATH)) {
            sessionData = require(SESSION_FILE_PATH);
        }
        const waClient = new Client({
            session: sessionData
        });


        waClient.on('authenticated', (session) => {
            sessionData = session;
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
        return waClient
    }

}