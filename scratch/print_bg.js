const db = require('../db');

async function main() {
    try {
        const [settingsRows] = await db.query('SELECT `key`, value FROM settings');
        console.log('--- SETTINGS IN DB ---');
        settingsRows.forEach(r => {
            if (r.key.includes('bg') || r.key.includes('event')) {
                console.log(`${r.key}: ${r.value}`);
            }
        });

        const [lsSettingsRows] = await db.query('SELECT `key`, value FROM lovestory_settings');
        console.log('--- LOVESTORY SETTINGS IN DB ---');
        lsSettingsRows.forEach(r => {
            console.log(`${r.key}: ${r.value}`);
        });

    } catch (e) {
        console.error('Error running query:', e);
    } finally {
        process.exit(0);
    }
}

main();
