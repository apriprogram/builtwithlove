const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');


const databasePath = path.resolve(__dirname, 'database.sqlite');
if (!fs.existsSync(databasePath)) {
  console.error('SQLite database not found at', databasePath);
  process.exit(1);
}

const sqliteDb = new sqlite3.Database(databasePath);

async function runMigration() {
  console.log('--- Starting Data Migration from SQLite to MySQL ---');
  let mysqlConn;
  try {
    mysqlConn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'wedding_invitation_db'
    });

    const tables = [
      'admin_users',
      'couple',
      'events',
      'gallery_images',
      'gifts',
      'guests',
      'lovestory',
      'lovestory_settings',
      'page_views',
      'rsvps',
      'settings',
      'wishes'
    ];

    for (const table of tables) {
      console.log(`Migrating table: ${table}`);
      
      const rows = await new Promise((resolve, reject) => {
        // SQLite query
        sqliteDb.all(`SELECT * FROM ${table}`, [], (err, rows) => {
          if (err) {
            // Some tables might not exist in SQLite if they are new
            if (err.message.includes('no such table')) {
              console.log(`Table ${table} does not exist in SQLite, skipping.`);
              resolve([]);
            } else {
              reject(err);
            }
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        console.log(`No data in ${table}`);
        continue;
      }

      const columns = Object.keys(rows[0]);
      
      // We will do an INSERT IGNORE or standard INSERT.
      // Better to clear the table first in MySQL if we want a fresh copy, 
      // but let's just do INSERT IGNORE or replace.
      await mysqlConn.query(`TRUNCATE TABLE \`${table}\``);
      
      for (const row of rows) {
        const values = columns.map(col => row[col]);
        const placeholders = columns.map(() => '?').join(', ');
        const sql = `INSERT INTO \`${table}\` (${columns.map(c => `\`${c}\``).join(', ')}) VALUES (${placeholders})`;
        try {
          await mysqlConn.execute(sql, values);
        } catch (e) {
          console.error(`Error inserting into ${table}:`, e.message);
        }
      }
      console.log(`Migrated ${rows.length} rows for ${table}`);
    }

    console.log('--- Data Migration Completed Successfully ---');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (mysqlConn) {
      await mysqlConn.end();
    }
    sqliteDb.close();
  }
}

runMigration();
