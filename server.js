const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const db = require('./db');
const xlsx = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, filename);
  }
});

const audioStorage = multer.diskStorage({
  destination: audioDir,
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `bg_music_${Date.now()}${extension}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const isExtensionAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeAllowed = allowedTypes.test(file.mimetype);
    if (isExtensionAllowed && isMimeAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diizinkan.'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

const excelUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const audioUpload = multer({
  storage: audioStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|wav|ogg|mpeg/;
    const isExtensionAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeAllowed = /audio|video\/mpeg|application\/octet-stream/.test(file.mimetype);
    if (isExtensionAllowed && isMimeAllowed) {
      cb(null, true);
    } else {
      cb(new Error(`Tipe file tidak didukung.`));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(session({
  secret: 'wedding-admin-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.redirect('/dashboard');
});

app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(uploadsDir));
app.use('/audio', express.static(audioDir));

async function ensureColumn(table, column, type) {
    try {
        const [rows] = await db.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [column]);
        if (rows.length === 0) {
            await db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
            console.log(`Added column ${column} to table ${table}`);
        }
    } catch (err) {
        console.error(`Error ensuring column ${column} in ${table}:`, err);
    }
}

async function initDb() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS guests (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name TEXT NOT NULL,
      first_name TEXT,
      token VARCHAR(100) UNIQUE NOT NULL,
      created_at TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS lovestory (
      id INT PRIMARY KEY AUTO_INCREMENT,
      type VARCHAR(50) NOT NULL DEFAULT 'chat',
      sender TEXT,
      message TEXT,
      time TEXT,
      date_label TEXT,
      order_no INT DEFAULT 0
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS lovestory_settings (
      \`key\` VARCHAR(100) PRIMARY KEY,
      value TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS page_views (
      id INT PRIMARY KEY AUTO_INCREMENT,
      guest_token VARCHAR(100),
      page VARCHAR(50) DEFAULT 'invitation',
      ip VARCHAR(50),
      user_agent TEXT,
      viewed_at TEXT
    )`);

    // Create settings table with LONGTEXT for large content like sliders
    await db.query(`CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(191) PRIMARY KEY,
      value LONGTEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

    await db.query("INSERT IGNORE INTO settings (`key`, value) VALUES (?, ?)", ['wa_template', 'Halo @nama,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami melalui link undangan digital berikut:\n\n@link\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir. Terima kasih.']);

    await db.query(`CREATE TABLE IF NOT EXISTS rsvps (
      id INT PRIMARY KEY AUTO_INCREMENT,
      guest_id INT,
      status VARCHAR(50),
      guest_count INT,
      created_at TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS wishes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      guest_id INT,
      message TEXT,
      created_at TEXT,
      reply TEXT,
      replied_at TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS admin_users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(100),
      password VARCHAR(255),
      full_name TEXT,
      email VARCHAR(255),
      phone VARCHAR(20),
      avatar TEXT
    )`);

    const [adminRows] = await db.query("SELECT COUNT(*) as count FROM admin_users");
    if (adminRows[0].count === 0) {
      await db.query("INSERT INTO admin_users (username, password, email, full_name) VALUES (?, ?, ?, ?)", ['admin', 'admin123', 'admin@example.com', 'Administrator']);
    }

    await db.query(`CREATE TABLE IF NOT EXISTS events (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name TEXT,
      heading TEXT,
      time TEXT,
      date TEXT,
      date_iso TEXT,
      location_name TEXT,
      address TEXT,
      map_src TEXT,
      map_link TEXT,
      icon_src TEXT,
      order_no INT DEFAULT 0
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS couple (
      id INT PRIMARY KEY AUTO_INCREMENT,
      role TEXT,
      name TEXT,
      description TEXT,
      parents TEXT,
      instagram TEXT,
      instagram_link TEXT,
      image_src TEXT,
      order_no INT DEFAULT 0
    )`);

    const [coupleRows] = await db.query("SELECT COUNT(*) as count FROM couple");
    if (coupleRows[0].count === 0) {
      await db.query("INSERT INTO couple (id, role, name, parents, instagram) VALUES (1, 'Mempelai Pria', 'Nama Mempelai Pria', 'Nama Ayah & Ibu', '@groom')");
      await db.query("INSERT INTO couple (id, role, name, parents, instagram) VALUES (2, 'Mempelai Wanita', 'Nama Mempelai Wanita', 'Nama Ayah & Ibu', '@bride')");
    }


    await db.query(`CREATE TABLE IF NOT EXISTS gallery_images (
      id INT PRIMARY KEY AUTO_INCREMENT,
      src TEXT,
      alt TEXT,
      order_no INT DEFAULT 0
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS gifts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      bank_name TEXT,
      account_number TEXT,
      account_name TEXT,
      logo_src TEXT,
      order_no INT DEFAULT 0
    )`);

    // Run migrations
    await ensureColumn('guests', 'first_name', 'TEXT');
    await ensureColumn('rsvps', 'guest_id', 'INT');
    await ensureColumn('wishes', 'guest_id', 'INT');
    await ensureColumn('wishes', 'reply', 'TEXT');
    await ensureColumn('wishes', 'replied_at', 'TEXT');
    await ensureColumn('admin_users', 'full_name', 'TEXT');
    await ensureColumn('admin_users', 'email', 'VARCHAR(255)');
    await ensureColumn('admin_users', 'phone', 'VARCHAR(20)');
    await ensureColumn('admin_users', 'avatar', 'TEXT');
    await ensureColumn('couple', 'image_src', 'TEXT');
    await ensureColumn('couple', 'instagram_link', 'TEXT');


    // Robust Settings Migration
    try {
      const [cols] = await db.query("SHOW COLUMNS FROM settings");
      const hasKeyColumn = cols.some(c => c.Field === 'key');
      const [keys] = await db.query("SHOW KEYS FROM settings WHERE Key_name = 'PRIMARY'");
      const hasKeyPK = keys.some(k => k.Column_name === 'key');
      const valueCol = cols.find(c => c.Field === 'value');
      const isLongText = valueCol && valueCol.Type.toLowerCase().includes('longtext');

      if (!hasKeyColumn || !hasKeyPK || !isLongText) {
        console.log('Settings table structure is outdated, migrating...');
        await db.query('DROP TABLE IF EXISTS settings_new');
        await db.query(`CREATE TABLE settings_new (
          \`key\` VARCHAR(191) PRIMARY KEY,
          value LONGTEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
        
        if (!hasKeyColumn) {
          const [oldRows] = await db.query("SELECT * FROM settings LIMIT 1");
          if (oldRows && oldRows[0]) {
            for (const [k, v] of Object.entries(oldRows[0])) {
              if (k !== 'id') await db.query("INSERT IGNORE INTO settings_new (`key`, value) VALUES (?, ?)", [k, String(v || '')]);
            }
          }
        } else {
          await db.query('INSERT IGNORE INTO settings_new SELECT `key`, value FROM settings');
        }
        await db.query('DROP TABLE settings');
        await db.query('ALTER TABLE settings_new RENAME TO settings');
      }
    } catch (err) {
      if (err.code !== 'ER_NO_SUCH_TABLE') console.error('Migration error:', err);
    }

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}

initDb();

const requireAdmin = (req, res, next) => {
  if (req.session.adminUser) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

async function queryAll(sql, params = []) {
  const [rows] = await db.query(sql, params);
  return rows;
}

async function queryGet(sql, params = []) {
  const [rows] = await db.query(sql, params);
  return rows[0] || null;
}

async function runSql(sql, params = []) {
  const [result] = await db.query(sql, params);
  return { lastID: result.insertId, changes: result.affectedRows };
}

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await queryGet('SELECT * FROM admin_users WHERE email = ? AND password = ?', [email, password]);
    if (!admin) return res.status(401).json({ error: 'Data login tidak valid' });
    req.session.adminUser = { id: admin.id, username: admin.username, full_name: admin.full_name, email: admin.email, phone: admin.phone, avatar: admin.avatar };
    res.json({ success: true, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Login gagal' });
  }
});

app.get('/api/admin/profile', requireAdmin, async (req, res) => {
  try {
    const admin = await queryGet('SELECT id, username, full_name, email, phone, avatar FROM admin_users WHERE id = ?', [req.session.adminUser.id]);
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/admin/profile', requireAdmin, async (req, res) => {
  const { full_name, email, phone, password, current_password } = req.body;
  const adminId = req.session.adminUser.id;
  try {
    const admin = await queryGet('SELECT password FROM admin_users WHERE id = ?', [adminId]);
    if (admin.password !== current_password) return res.status(400).json({ error: 'Current password incorrect' });
    await runSql('UPDATE admin_users SET full_name = ?, email = ?, phone = ? WHERE id = ?', [full_name, email, phone, adminId]);
    if (password && password.trim().length > 0) await runSql('UPDATE admin_users SET password = ? WHERE id = ?', [password, adminId]);
    req.session.adminUser = { ...req.session.adminUser, full_name, email, phone };
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.post('/api/admin/profile/avatar', requireAdmin, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE admin_users SET avatar = ? WHERE id = ?', [src, req.session.adminUser.id]);
    req.session.adminUser.avatar = src;
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

app.get('/api/admin/status', (req, res) => {
  if (req.session && req.session.adminUser) return res.json({ authenticated: true, user: req.session.adminUser });
  res.json({ authenticated: false });
});

function extractFirstName(fullName) {
  const beforeComma = fullName.split(',')[0].trim();
  return beforeComma.split(' ')[0];
}

async function generateTokenFromFirstName(firstName) {
  let token = firstName;
  let counter = 1;
  let existing = await queryGet('SELECT id FROM guests WHERE token = ?', [token]);
  while (existing) {
    token = `${firstName}${counter}`;
    existing = await queryGet('SELECT id FROM guests WHERE token = ?', [token]);
    counter++;
  }
  return token;
}

app.get('/api/public', async (req, res) => {
  try {
    const token = req.query.token;
    const settingsRows = await queryAll('SELECT `key`, value FROM settings');
    const settings = {};
    settingsRows.forEach((row) => { settings[row.key] = row.value; });
    const events = await queryAll('SELECT * FROM events ORDER BY order_no ASC');
    const couple = await queryAll('SELECT * FROM couple ORDER BY order_no ASC');
    const gallery = await queryAll('SELECT * FROM gallery_images ORDER BY order_no ASC');
    const wishes = await queryAll(`SELECT w.id, w.message, w.created_at, w.reply, w.replied_at, g.name AS guest_name FROM wishes w LEFT JOIN guests g ON g.id = w.guest_id ORDER BY w.id DESC LIMIT 30`);
    let guest = null;
    if (token) {
      guest = await queryGet(`SELECT g.id, g.name, g.token, r.status AS rsvp_status, r.guest_count AS rsvp_guest_count FROM guests g LEFT JOIN rsvps r ON r.guest_id = g.id WHERE g.token = ? ORDER BY r.id DESC LIMIT 1`, [token]);
    }
    const lovestory = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const lsSettingsRows = await queryAll('SELECT `key`, value FROM lovestory_settings');
    const lovestory_settings = {};
    lsSettingsRows.forEach(r => { lovestory_settings[r.key] = r.value; });
    const gifts = await queryAll('SELECT * FROM gifts ORDER BY order_no ASC');
    res.json({ settings, events, couple, gallery, wishes, guest, lovestory, lovestory_settings, gifts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load public data' });
  }
});

app.post('/api/pageview', async (req, res) => {
  try {
    const { guest_token, page } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const viewedAt = new Date().toISOString();
    await runSql('INSERT INTO page_views (guest_token, page, ip, user_agent, viewed_at) VALUES (?, ?, ?, ?, ?)', [guest_token || null, page || 'invitation', ip, req.headers['user-agent'] || '', viewedAt]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record page view.' });
  }
});

app.post('/api/wishes', async (req, res) => {
  const { guest_token, message } = req.body;
  try {
    const guest = await queryGet('SELECT id, name FROM guests WHERE token = ?', [guest_token]);
    if (!guest) return res.status(400).json({ error: 'Invalid guest link.' });
    const createdAt = new Date().toISOString();
    const result = await runSql('INSERT INTO wishes (guest_id, message, created_at) VALUES (?, ?, ?)', [guest.id, message, createdAt]);
    res.json({ wish: { id: result.lastID, guest_id: guest.id, guest_name: guest.name, message, created_at: createdAt } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save wish.' });
  }
});

app.post('/api/rsvp', async (req, res) => {
  const { guest_token, status, guest_count } = req.body;
  try {
    const guest = await queryGet('SELECT id, name FROM guests WHERE token = ?', [guest_token]);
    if (!guest) return res.status(400).json({ error: 'Invalid guest link.' });
    const existing = await queryGet('SELECT id FROM rsvps WHERE guest_id = ?', [guest.id]);
    if (existing) return res.status(400).json({ error: 'Anda sudah melakukan konfirmasi kehadiran.' });
    const result = await runSql('INSERT INTO rsvps (guest_id, status, guest_count, created_at) VALUES (?, ?, ?, ?)', [guest.id, status, parseInt(guest_count, 10), new Date().toISOString()]);
    res.json({ success: true, id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save RSVP.' });
  }
});

app.get('/api/admin/dashboard', requireAdmin, async (req, res) => {
  try {
    const events = await queryAll('SELECT * FROM events ORDER BY order_no ASC');
    const couple = await queryAll('SELECT * FROM couple ORDER BY order_no ASC');
    const guests = await queryAll('SELECT * FROM guests ORDER BY created_at DESC');
    const rsvps = await queryAll(`SELECT r.*, g.name AS guest_name FROM rsvps r LEFT JOIN guests g ON g.id = r.guest_id ORDER BY r.created_at DESC LIMIT 50`);
    const wishes = await queryAll(`SELECT w.*, g.name AS guest_name FROM wishes w LEFT JOIN guests g ON g.id = w.guest_id ORDER BY w.created_at DESC LIMIT 50`);
    const settingsRows = await queryAll('SELECT `key`, value FROM settings');
    const settings = {};
    settingsRows.forEach((row) => (settings[row.key] = row.value));
    
    const gifts = await queryAll('SELECT * FROM gifts ORDER BY order_no ASC');
    const gallery = await queryAll('SELECT * FROM gallery_images ORDER BY order_no ASC');
    const lovestory = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const lsSettingsRows = await queryAll('SELECT `key`, value FROM lovestory_settings');
    const lovestory_settings = {};
    lsSettingsRows.forEach(r => { lovestory_settings[r.key] = r.value; });

    res.json({ events, couple, guests, rsvps, wishes, settings, gifts, gallery, lovestory, lovestory_settings });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard.' });
  }
});

app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  const entries = Object.entries(req.body);
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (const [key, value] of entries) {
      await conn.query('INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', [key, value, value]);
    }
    await conn.commit();
    res.json({ success: true });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
});

app.post('/api/admin/settings/upload', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  const { setting_key } = req.body;
  try {
    if (setting_key) await runSql('INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', [setting_key, src, src]);
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.post('/api/admin/music/upload', requireAdmin, audioUpload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No audio uploaded' });
  const src = `/audio/${req.file.filename}`;
  try {
    await runSql('INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', ['bg_music', src, src]);
    res.json({ success: true, src });
  } catch (error) {
    console.error('Music upload error:', error);
    res.status(500).json({ error: 'Gagal menyimpan konfigurasi musik' });
  }
});

app.post('/api/admin/guests', requireAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const firstName = extractFirstName(name);
    const token = await generateTokenFromFirstName(firstName);
    const result = await runSql('INSERT INTO guests (name, first_name, token, created_at) VALUES (?, ?, ?, ?)', [name, firstName, token, new Date().toISOString()]);
    res.json({ success: true, guest: { id: result.lastID, name, token } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create guest' });
  }
});

app.delete('/api/admin/guests/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM guests WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// GIFTS MANAGEMENT
app.post('/api/admin/gifts', requireAdmin, async (req, res) => {
  try {
    const { bank_name, account_number, account_name, logo_src } = req.body;
    const [lastOrder] = await db.query('SELECT MAX(order_no) as max_order FROM gifts');
    const order_no = (lastOrder[0].max_order || 0) + 1;
    const result = await runSql('INSERT INTO gifts (bank_name, account_number, account_name, logo_src, order_no) VALUES (?, ?, ?, ?, ?)', [bank_name, account_number, account_name, logo_src, order_no]);
    res.json({ success: true, gift: { id: result.lastID, bank_name, account_number, account_name, logo_src, order_no } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gift' });
  }
});

app.put('/api/admin/gifts/:id', requireAdmin, async (req, res) => {
  try {
    const { bank_name, account_number, account_name, logo_src } = req.body;
    await runSql('UPDATE gifts SET bank_name = ?, account_number = ?, account_name = ?, logo_src = ? WHERE id = ?', [bank_name, account_number, account_name, logo_src, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/admin/gifts/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM gifts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/admin/gifts/:id/logo', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE gifts SET logo_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.post('/api/admin/gifts/reorder', requireAdmin, async (req, res) => {
  const { ids } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (let i = 0; i < ids.length; i++) {
      await conn.query('UPDATE gifts SET order_no = ? WHERE id = ?', [i, ids[i]]);
    }
    await conn.commit();
    res.json({ success: true });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
});

// LOVESTORY MANAGEMENT
app.get('/api/admin/lovestory', requireAdmin, async (req, res) => {
  try {
    const messages = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const settingsRows = await queryAll('SELECT `key`, value FROM lovestory_settings');
    const settings = {};
    settingsRows.forEach(r => { settings[r.key] = r.value; });
    
    const formattedSettings = {
        title: settings.ls_title || '',
        male_avatar: settings.ls_male_avatar || '',
        female_avatar: settings.ls_female_avatar || '',
        lovestory_bg: settings.lovestory_bg || '',
        lovestory_card_bg: settings.lovestory_card_bg || ''
    };

    res.json({ messages, settings: formattedSettings });
  } catch (error) {
    console.error('Fetch lovestory error:', error);
    res.status(500).json({ error: 'Failed to fetch love story' });
  }
});

app.put('/api/admin/lovestory', requireAdmin, async (req, res) => {
  const { title, lovestory_bg, lovestory_card_bg, messages } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    // Update settings
    await conn.query('INSERT INTO lovestory_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', ['ls_title', title, title]);
    if (lovestory_bg !== undefined) await conn.query('INSERT INTO lovestory_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', ['lovestory_bg', lovestory_bg, lovestory_bg]);
    if (lovestory_card_bg !== undefined) await conn.query('INSERT INTO lovestory_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', ['lovestory_card_bg', lovestory_card_bg, lovestory_card_bg]);

    // Update messages
    if (Array.isArray(messages)) {
      await conn.query('DELETE FROM lovestory');
      for (let i = 0; i < messages.length; i++) {
        const m = messages[i];
        await conn.query('INSERT INTO lovestory (type, sender, message, time, date_label, order_no) VALUES (?, ?, ?, ?, ?, ?)', 
          [m.type || 'chat', m.sender || '', m.message || '', m.time || '', m.date_label || '', i]);
      }
    }

    await conn.commit();
    res.json({ success: true });
  } catch (error) {
    await conn.rollback();
    console.error('Lovestory update error:', error);
    res.status(500).json({ error: 'Failed to update love story' });
  } finally {
    conn.release();
  }
});

app.post('/api/admin/lovestory/avatar/:role', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  const role = req.params.role;
  const key = role === 'male' ? 'ls_male_avatar' : 'ls_female_avatar';
  try {
    await runSql('INSERT INTO lovestory_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', [key, src, src]);
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/admin/pageviews', requireAdmin, async (req, res) => {
  try {
    const total = await queryGet('SELECT COUNT(*) as count FROM page_views');
    const unique = await queryGet('SELECT COUNT(DISTINCT guest_token) as count FROM page_views');
    const today = await queryGet('SELECT COUNT(*) as count FROM page_views WHERE viewed_at LIKE ?', [new Date().toISOString().split('T')[0] + '%']);
    res.json({ total: total.count, unique: unique.count, today: today.count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page views' });
  }
});

app.get('/api/admin/pageviews', requireAdmin, async (req, res) => {
  try {
    const total = await queryGet('SELECT COUNT(*) as count FROM page_views');
    const unique = await queryGet('SELECT COUNT(DISTINCT guest_token) as count FROM page_views');
    const today = await queryGet('SELECT COUNT(*) as count FROM page_views WHERE viewed_at LIKE ?', [new Date().toISOString().split('T')[0] + '%']);
    res.json({ total: total ? total.count : 0, unique: unique ? unique.count : 0, today: today ? today.count : 0 });
  } catch (error) {
    console.error('Pageviews error:', error);
    res.status(500).json({ error: 'Failed to fetch page views' });
  }
});

// EVENTS MANAGEMENT
app.post('/api/admin/events', requireAdmin, async (req, res) => {
  try {
    const { name, heading, time, date, date_iso, location_name, address, map_src, map_link } = req.body;
    const [lastOrder] = await db.query('SELECT MAX(order_no) as max_order FROM events');
    const order_no = (lastOrder[0].max_order || 0) + 1;
    const result = await runSql('INSERT INTO events (name, heading, time, date, date_iso, location_name, address, map_src, map_link, order_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [name, heading, time, date, date_iso, location_name, address, map_src, map_link, order_no]);
    res.json({ success: true, event: { id: result.lastID, name, heading, time, date, date_iso, location_name, address, map_src, map_link, order_no } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/admin/events/:id', requireAdmin, async (req, res) => {
  try {
    const { name, heading, time, date, date_iso, location_name, address, map_src, map_link } = req.body;
    await runSql('UPDATE events SET name = ?, heading = ?, time = ?, date = ?, date_iso = ?, location_name = ?, address = ?, map_src = ?, map_link = ? WHERE id = ?', 
      [name, heading, time, date, date_iso, location_name, address, map_src, map_link, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/admin/events/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/admin/events/:id/icon', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE events SET icon_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// COUPLE MANAGEMENT
app.put('/api/admin/couple/:id', requireAdmin, async (req, res) => {
  try {
    const { role, name, description, parents, instagram, instagram_link, image_src } = req.body;
    const id = req.params.id;
    
    // Standard UPDATE since we ensured rows 1 & 2 exist in initDb
    const sql = `UPDATE couple SET 
      role = ?, 
      name = ?, 
      description = ?, 
      parents = ?, 
      instagram = ?, 
      instagram_link = ?, 
      image_src = ? 
      WHERE id = ?`;
    
    const params = [
      role || '', 
      name || '', 
      description || '', 
      parents || '', 
      instagram || '', 
      instagram_link || '', 
      image_src || '', 
      id
    ];
    
    await runSql(sql, params);
    res.json({ success: true });
  } catch (error) {
    console.error('Update couple error:', error);
    res.status(500).json({ 
      error: 'Update failed', 
      detail: error.message,
      code: error.code
    });
  }
});




app.post('/api/admin/couple/:id/photo', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE couple SET image_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// GALLERY MANAGEMENT
app.post('/api/admin/gallery', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  const { alt } = req.body;
  try {
    const [lastOrder] = await db.query('SELECT MAX(order_no) as max_order FROM gallery_images');
    const order_no = (lastOrder[0].max_order || 0) + 1;
    const result = await runSql('INSERT INTO gallery_images (src, alt, order_no) VALUES (?, ?, ?)', [src, alt || '', order_no]);
    res.json({ success: true, image: { id: result.lastID, src, alt, order_no } });
  } catch (error) {
    res.status(500).json({ error: 'Gallery upload failed' });
  }
});

app.put('/api/admin/gallery/:id/meta', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { alt } = req.body;
    if (req.file) {
      const src = `/uploads/${req.file.filename}`;
      await runSql('UPDATE gallery_images SET src = ?, alt = ? WHERE id = ?', [src, alt || '', req.params.id]);
    } else {
      await runSql('UPDATE gallery_images SET alt = ? WHERE id = ?', [alt || '', req.params.id]);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.post('/api/admin/gallery/reorder', requireAdmin, async (req, res) => {
  const { sequence } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (let i = 0; i < sequence.length; i++) {
      await conn.query('UPDATE gallery_images SET order_no = ? WHERE id = ?', [i, sequence[i]]);
    }
    await conn.commit();
    res.json({ success: true });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
});

app.delete('/api/admin/gallery/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// RSVPS & WISHES MANAGEMENT
app.delete('/api/admin/rsvps/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM rsvps WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.delete('/api/admin/wishes/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM wishes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.post('/api/admin/wishes/:id/reply', requireAdmin, async (req, res) => {
  const { reply } = req.body;
  try {
    await runSql('UPDATE wishes SET reply = ?, replied_at = ? WHERE id = ?', [reply, new Date().toISOString(), req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Reply failed' });
  }
});

app.get('/api/debug/settings', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM settings');
    const [schema] = await db.query('SHOW CREATE TABLE settings');
    res.json({ rows, schema });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
