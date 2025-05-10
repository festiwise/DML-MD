const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0lROWlEQUhJblhWVzhPRDJiWFVzUUhqZTlmY2pTaTEyN2JyS2xTdmRrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1hWeVpsVjRCQ0RzRTV0V2Y1dzVUdjhnS2dqUDZ0TVVYcGFkNXVFYm1EST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTmtXUXV2bFZXcFZQMXlMaDYrYVlBKzVlR1UremVwcnE1RW5FRmZ0ZG1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVUUp1b2VZdmNIUXAzL3dHSEVEelFNaDRjbGYwRGY1U0tFeE1jYmpvRWpBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlCSms5aFZFejBmUnhuVlFudjZqSGpHZ1ZtTHRUNjkzc010dUpZRkgybms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV0Vk91czVtbkI4RWtBUzdmTSsvcVFUMXVpTmhQSm55RGcyYll3aS9Ma1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUl2N0UyV0RXYzZHSC9QR1hJcmQreGJrSDFFZ2tkaHRaNGgySGFZaTlsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVFlVktmc1ErYzZoalhuNVo3NmVBSEUwMEpCUEx6a3ljMU5wZVlrSjB6UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJEbC9FR3J2YjJraDJUNmMrNk9DeUM1QXM4ZXdZTWgzNUVWUzAwbFJqMU41dWxBYUI3K25pVWo1Q1hmSS84c3pPUEJENEZNYXlwaGtLUnV0RmV0a2lnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJSQ041UnBsK1pXQ3E0bW82Y1JFZE5adWVwc1pPKzZmbk5zSzdjT2V6eExNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqdnVYYmtsSFNmeUdiWTZtMVN2MFpRIiwicGhvbmVJZCI6IjI3MmQ3YjllLWMyNmEtNDgxZi05NzE2LTA1NDBmYTlhY2JiNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiOStMTFh2d0RrOUxTbEQ1YldUdEIxYUtjUjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFo2eTFyZUtNaytmL2ZtTU1RL2c3R01vYmZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ1WTFZN1lBIiwibWUiOnsiaWQiOiIyMzM1NTA5Mjg3OTU6NDRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09pNnowVVFpTGord0FZWUVpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlROdTR6WjRlQzVUVnpsWWVybzF3c3Z6RDdGTEtqM2hrWnVUTzY3djZtMWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InNMbzJwbk9Lb0RyTTNnNkhhRHFxQ05kTGN3aDl1V0hCdktvZlVaK3pBdSszNStuMHZsYXpBYWt3OUZSVVBSSU1sYVVOaVRveVZHTktHdUN5enB1ckJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJLNVY3QmlHeW9LdUU2NUtSaW9lSzZBcnpNSkYySFN0a0FLWTJUMHhNUVFnNHdCbExYaEtsa2JxZDNLeFBtMWV6ekRVVktKMUtMbzR5ZlZKOVR0U3dndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU1MDkyODc5NTo0NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVemJ1TTJlSGd1VTFjNVdIcTZOY0xMOHcreFN5bzk0Wkdia3p1dTcrcHRZIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY5MDIwMzcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWRIIn0=',
    PREFIXE: process.env.PREFIX || "&",
    OWNER_NAME: process.env.OWNER_NAME || "STEEZ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "+233550928795",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'STEEZ-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

