const db = require('./db');
async function run() {
    try {
        await db.query('ALTER TABLE guests ADD COLUMN jabatan VARCHAR(255) DEFAULT NULL;');
        console.log("Column 'jabatan' added successfully.");
    } catch (e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
            console.log("Column 'jabatan' already exists.");
        } else {
            console.error(e);
        }
    }
    process.exit();
}
run();
