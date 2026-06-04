const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.resolve(__dirname, '..', 'database.sqlite');
if (fs.existsSync(databasePath)) {
  console.log('Database already exists at', databasePath);
}

const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    email TEXT,
    phone TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    heading TEXT,
    time TEXT,
    date TEXT,
    location_name TEXT,
    address TEXT,
    map_src TEXT,
    map_link TEXT,
    icon_src TEXT,
    order_no INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS couple (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    name TEXT,
    description TEXT,
    parents TEXT,
    instagram TEXT,
    image_src TEXT,
    order_no INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT,
    alt TEXT,
    order_no INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    first_name TEXT,
    token TEXT UNIQUE NOT NULL,
    created_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    guest_id INTEGER,
    status TEXT,
    guest_count INTEGER,
    created_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_id INTEGER,
    name TEXT,
    message TEXT,
    reply TEXT,
    replied_at TEXT,
    created_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS footer_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  db.run(`INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)`, ['admin', 'admin123']);

  const defaults = [
    ['cover_title', 'The Wedding'],
    ['cover_subtitle', 'Of'],
    ['hero_name', 'Riandino & Aurora'],
    ['guest_prefix', 'Kepada Yth. Bapak/Ibu/Saudara/i:'],
    ['guest_label', 'Nama Tamu'],
    ['hero_button', 'Buka Undangan'],
    ['rsvp_heading', 'Kehadiran'],
    ['wishes_heading', 'Wedding Wishes']
  ];

  const stmt = db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`);
  defaults.forEach(([key, value]) => stmt.run(key, value));
  stmt.finalize();

  const footerDefaults = [
    ['footer_name', 'Riandino & Aurora'],
    ['footer_domain', 'riandanaurora.my.id'],
    ['footer_bg_img', ''],
    ['footer_bg_mode', 'color'],
    ['footer_bg_color', '#000000']
  ];
  const footerStmt = db.prepare(`INSERT OR IGNORE INTO footer_settings (key, value) VALUES (?, ?)`);
  footerDefaults.forEach(([key, value]) => footerStmt.run(key, value));
  footerStmt.finalize();

  db.run(`INSERT OR IGNORE INTO events (id, name, heading, time, date, location_name, address, map_src, map_link, icon_src, order_no) VALUES
    (1, 'Pemberkatan', 'Pemberkatan', '14.00 WIB - Selesai', 'Jumat, 26 Juni 2026', 'GBKP Rg. Km. 7 Pd. Bulan Medan', 'Jl. Jamin Ginting Km.7 No.47, Kwala Bekala, Kec. Medan Johor, Kota Medan, Sumatera Utara 20142', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.206084629991!2d98.6537243!3d3.5398614000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031255611ea18e3%3A0x343e62a412350a87!2sGBKP%20Km%207%20Padang%20Bulan%20Medan!5e0!3m2!1sid!2sid!4v1775397763145!5m2!1sid!2sid', 'https://maps.app.goo.gl/vzLpascwksoDEuVm7?g_st=iw', 'img/icon/Gereja.png', 1),
    (2, 'Resepsi', 'Resepsi', '07.00 WIB - Selesai', 'Sabtu, 27 Juni 2026', 'Jambur Namaken', 'JL Letjen Jamin Ginting No, Gg. Jati No.30, Beringin, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20146', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4780.704822897254!2d98.65595449999999!3d3.5430652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312542d2aff341%3A0x3b57f9377202258c!2sJambur%20Namaken!5e0!3m2!1sid!2sid!4v1775398275336!5m2!1sid!2sid', 'https://maps.app.goo.gl/YHzKoe1XCCaV65mp7?g_st=iw', 'img/icon/Traditional%20Batak%20house%20icon.png', 2)
  `);

  db.run(`INSERT OR IGNORE INTO couple (id, role, name, description, parents, instagram, image_src, order_no) VALUES
    (1, 'Groom', 'Riandino Oginta Tarigan, A.Md.', 'The Groom', 'Putra dari\nBapak Drs. Tampe Malem Tarigan & Ibu Toberina Surbakti', '@ryan_tarigan', 'img/rian.jpeg', 1),
    (2, 'Bride', 'Aurora Picessa Brahmana, A.Md.', 'The Bride', 'Putri dari\nBapak Ir. Marthin Luther Brahmana & Ibu Ir. Roslila Br Perangin-angin', '@aurorapcsa', 'img/aurora.jpeg', 2)
  `);

  db.run(`INSERT OR IGNORE INTO gallery_images (id, src, alt, order_no) VALUES
    (1, 'img/cover/slide1.jpeg', 'Moment 1', 1),
    (2, 'img/cover/slide9.jpeg', 'Moment 2', 2),
    (3, 'img/cover/slide2.jpeg', 'Moment 3', 3),
    (4, 'img/cover/slide3.jpeg', 'Moment 4', 4),
    (5, 'img/cover/slide4.jpeg', 'Moment 5', 5),
    (6, 'img/cover/slide5.jpeg', 'Moment 6', 6),
    (7, 'img/cover/slide6.jpeg', 'Moment 7', 7),
    (8, 'img/cover/slide7.jpeg', 'Moment 8', 8),
    (9, 'img/cover/slide8.jpeg', 'Moment 9', 9)
  `);

  console.log('Database migration completed.');
});

db.close();
