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

// Dedicated Multer for Excel/CSV (No image filtering)
const excelUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const audioUpload = multer({
  storage: audioStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|wav|ogg|mpeg/;
    const isExtensionAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    // Windows browsers sometimes send audio as alternative mimetypes
    const isMimeAllowed = /audio|video\/mpeg|application\/octet-stream/.test(file.mimetype);
    
    if (isExtensionAllowed && isMimeAllowed) {
      cb(null, true);
    } else {
      cb(new Error(`Tipe file tidak didukung. Format ekstensi atau tipe MIME tidak sesuai (MIME: ${file.mimetype}).`));
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

// Clean URL for Admin Dashboard & Redirect old URL
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.redirect('/dashboard');
});

app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(uploadsDir));
app.use('/audio', express.static(audioDir));

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
      ` + "`key`" + ` VARCHAR(100) PRIMARY KEY,
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

    await db.query(`CREATE TABLE IF NOT EXISTS settings (
      ` + "`key`" + ` VARCHAR(100) PRIMARY KEY,
      value TEXT
    )`);

    // Initial default settings
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

    const [eventRows] = await db.query("SELECT COUNT(*) as count FROM events");
    if (eventRows[0].count === 0) {
      await db.query("INSERT INTO events (name, heading, time, date, date_iso, location_name, address, map_src, map_link, icon_src, order_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ['Pemberkatan Nikah', 'Pemberkatan Nikah', '14.00 WIB - Selesai', 'Jumat, 26 Juni 2026', '2026-06-26', 'GBKP Rg. Km. 7 Pd. Bulan Medan', 'Jl. Jamin Ginting Km.7 No.47, Kwala Bekala, Kec. Medan Johor, Kota Medan, Sumatera Utara 20142', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2133203531085!2d98.6436662758999!3d3.5381836506385845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312ff607d72661%3A0x633513a968652d8c!2sGBKP%20Km%207!5e0!3m2!1sid!2sid!4v1711100000000!5m2!1sid!2sid', 'https://maps.app.goo.gl/9ZzRz9ZzRz9ZzRz9A', 'img/icon/Gereja.png', 1]);
      await db.query("INSERT INTO events (name, heading, time, date, date_iso, location_name, address, map_src, map_link, icon_src, order_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ['Adat & Resepsi', 'Adat & Resepsi', '07.00 WIB - Selesai', 'Sabtu, 27 Juni 2026', '2026-06-27', 'Jambur Namaken', 'JL Letjen Jamin Ginting No, Gg. Jati No.30, Beringin, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20146', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.164312674393!2d98.6366662759!3d3.55818365064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f849e7b3997%3A0xc30a1b63e9c7a7e!2sJambur%20Namaken!5e0!3m2!1sid!2sid!4v1711100000000!5m2!1sid!2sid', 'https://maps.app.goo.gl/8ZzRz8ZzRz8ZzRz8B', 'img/icon/Traditional Batak house icon.png', 2]);
    }

    await db.query(`CREATE TABLE IF NOT EXISTS couple (
      id INT PRIMARY KEY AUTO_INCREMENT,
      role TEXT,
      name TEXT,
      description TEXT,
      parents TEXT,
      instagram TEXT,
      image_src TEXT,
      order_no INT DEFAULT 0
    )`);

    const [coupleRows] = await db.query("SELECT COUNT(*) as count FROM couple");
    if (coupleRows[0].count === 0) {
      await db.query("INSERT INTO couple (role, name, parents, instagram, image_src, order_no) VALUES (?, ?, ?, ?, ?, ?)", ['The Groom', 'Riandino Oginta Tarigan, A.Md.', 'Putra dari\nBapak Drs. Tampe Malem Tarigan & Ibu Toberina Surbakti', '@ryan_tarigan', 'img/rian.jpeg', 1]);
      await db.query("INSERT INTO couple (role, name, parents, instagram, image_src, order_no) VALUES (?, ?, ?, ?, ?, ?)", ['The Bride', 'Aurora Picessa Brahmana, A.Md.', 'Putri dari\nBapak Ir. Marthin Luther Brahmana & Ibu Ir. Roslila Br Perangin-angin', '@aurorapcsa', 'img/aurora.jpeg', 2]);
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

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}

initDb();

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

async function ensureColumn(table, column, definition) {
  const [rows] = await db.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [column]);
  if (rows.length === 0) {
    await db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    return true;
  }
  return false;
}

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi.' });
  }

  try {
    const admin = await queryGet('SELECT * FROM admin_users WHERE email = ? AND password = ?', [email, password]);
    if (!admin) {
      return res.status(401).json({ error: 'Data login tidak valid' });
    }
    req.session.adminUser = { id: admin.id, username: admin.username, full_name: admin.full_name, email: admin.email, phone: admin.phone, avatar: admin.avatar };
    res.json({ success: true, email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login gagal' });
  }
});

app.get('/api/admin/profile', requireAdmin, async (req, res) => {
  try {
    const admin = await queryGet('SELECT id, username, full_name, email, phone, avatar FROM admin_users WHERE id = ?', [req.session.adminUser.id]);
    res.json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/admin/profile', requireAdmin, async (req, res) => {
  const { full_name, email, phone, password, current_password } = req.body;
  const adminId = req.session.adminUser.id;

  try {
    // 1. Verify current password
    const admin = await queryGet('SELECT password FROM admin_users WHERE id = ?', [adminId]);
    if (admin.password !== current_password) {
      return res.status(400).json({ error: 'Current password incorrect' });
    }

    // 2. Update basic info
    await runSql('UPDATE admin_users SET full_name = ?, email = ?, phone = ? WHERE id = ?', [full_name, email, phone, adminId]);

    // 3. Optional password update
    if (password && password.trim().length > 0) {
      await runSql('UPDATE admin_users SET password = ? WHERE id = ?', [password, adminId]);
    }

    // Update session
    req.session.adminUser = { ...req.session.adminUser, full_name, email, phone };
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.post('/api/admin/profile/avatar', requireAdmin, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE admin_users SET avatar = ? WHERE id = ?', [src, req.session.adminUser.id]);
    req.session.adminUser.avatar = src;
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

app.get('/api/admin/status', (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.json({ authenticated: true, user: req.session.adminUser });
  }
  res.json({ authenticated: false });
});

function generateToken(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

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
    const settingsRows = await queryAll('SELECT key, value FROM settings');
    const settings = {};
    settingsRows.forEach((row) => { settings[row.key] = row.value; });

    const events = await queryAll('SELECT * FROM events ORDER BY order_no ASC');
    const couple = await queryAll('SELECT * FROM couple ORDER BY order_no ASC');
    const gallery = await queryAll('SELECT * FROM gallery_images ORDER BY order_no ASC');
    const wishes = await queryAll(`
      SELECT w.id, w.message, w.created_at, w.reply, w.replied_at, g.name AS guest_name
      FROM wishes w
      LEFT JOIN guests g ON g.id = w.guest_id
      ORDER BY w.id DESC LIMIT 30
    `);

    let guest = null;
    if (token) {
      guest = await queryGet(`
        SELECT g.id, g.name, g.token, r.status AS rsvp_status, r.guest_count AS rsvp_guest_count
        FROM guests g
        LEFT JOIN rsvps r ON r.guest_id = g.id
        WHERE g.token = ?
        ORDER BY r.id DESC
        LIMIT 1
      `, [token]);
    }

    const lovestory = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const lsSettingsRows = await queryAll('SELECT key, value FROM lovestory_settings');
    const lovestory_settings = {};
    lsSettingsRows.forEach(r => { lovestory_settings[r.key] = r.value; });
    const gifts = await queryAll('SELECT * FROM gifts ORDER BY order_no ASC');

    res.json({ settings, events, couple, gallery, wishes, guest, lovestory, lovestory_settings, gifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load public data' });
  }
});

// ============================================================
// PAGE VIEWS TRACKING
// ============================================================
app.post('/api/pageview', async (req, res) => {
  try {
    const { guest_token, page } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const viewedAt = new Date().toISOString();
    await runSql(
      'INSERT INTO page_views (guest_token, page, ip, user_agent, viewed_at) VALUES (?, ?, ?, ?, ?)',
      [guest_token || null, page || 'invitation', ip, userAgent, viewedAt]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record page view.' });
  }
});

app.get('/api/admin/pageviews', requireAdmin, async (req, res) => {
  try {
    const total = await queryGet('SELECT COUNT(*) AS count FROM page_views');
    const today = await queryGet(
      `SELECT COUNT(*) AS count FROM page_views WHERE date(viewed_at) = date('now', 'localtime')`
    );
    const week = await queryGet(
      `SELECT COUNT(*) AS count FROM page_views WHERE viewed_at >= datetime('now', '-7 days')`
    );
    const unique = await queryGet(
      `SELECT COUNT(DISTINCT COALESCE(guest_token, ip)) AS count FROM page_views`
    );
    const daily = await queryAll(
      `SELECT date(viewed_at) AS day, COUNT(*) AS count FROM page_views GROUP BY day ORDER BY day DESC LIMIT 7`
    );
    res.json({ total: total.count, today: today.count, week: week.count, unique: unique.count, daily });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load page views.' });
  }
});

app.post('/api/wishes', async (req, res) => {
  const { guest_token, message } = req.body;
  if (!guest_token || !message) {
    return res.status(400).json({ error: 'Guests token and message are required.' });
  }

  try {
    const guest = await queryGet('SELECT id, name FROM guests WHERE token = ?', [guest_token]);
    if (!guest) {
      return res.status(400).json({ error: 'Invalid guest link.' });
    }

    const limitSetting = await queryGet("SELECT value FROM settings WHERE key = 'wishes_limit'");
    const wishesLimit = parseInt(limitSetting?.value || '0', 10);
    
    if (wishesLimit > 0) {
      const existingWishes = await queryGet('SELECT COUNT(*) as count FROM wishes WHERE guest_id = ?', [guest.id]);
      if (existingWishes.count >= wishesLimit) {
        return res.status(403).json({ error: `Anda telah mencapai batas maksimal (${wishesLimit} kali) pengiriman ucapan.` });
      }
    }

    const createdAt = new Date().toISOString();
    const result = await runSql('INSERT INTO wishes (guest_id, message, created_at) VALUES (?, ?, ?)', [guest.id, message, createdAt]);
    const wish = { id: result.lastID, guest_id: guest.id, guest_name: guest.name, message, created_at: createdAt };

    
    res.json({ wish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save wish.' });
  }
});

app.post('/api/rsvp', async (req, res) => {
  const { guest_token, status, guest_count } = req.body;
  if (!guest_token || !status || !guest_count) {
    return res.status(400).json({ error: 'All RSVP fields are required.' });
  }

  try {
    const guest = await queryGet('SELECT id, name FROM guests WHERE token = ?', [guest_token]);
    if (!guest) {
      return res.status(400).json({ error: 'Invalid guest link.' });
    }

    // Check if guest already submitted RSVP
    const existing = await queryGet('SELECT id FROM rsvps WHERE guest_id = ?', [guest.id]);
    if (existing) {
      return res.status(400).json({ error: 'Anda sudah melakukan konfirmasi kehadiran sebelumnya.' });
    }

    const createdAt = new Date().toISOString();
    const result = await runSql('INSERT INTO rsvps (guest_id, status, guest_count, created_at) VALUES (?, ?, ?, ?)', [guest.id, status, parseInt(guest_count, 10), createdAt]);

    
    res.json({ success: true, id: result.lastID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save RSVP.' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await queryAll('SELECT * FROM events ORDER BY order_no ASC');
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load events.' });
  }
});

app.get('/api/couple', async (req, res) => {
  try {
    const couple = await queryAll('SELECT * FROM couple ORDER BY order_no ASC');
    res.json({ couple });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load couple data.' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await queryAll('SELECT * FROM gallery_images ORDER BY order_no ASC');
    res.json({ gallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load gallery.' });
  }
});

app.get('/api/rsvps', requireAdmin, async (req, res) => {
  try {
    const rsvps = await queryAll('SELECT * FROM rsvps ORDER BY created_at DESC');
    res.json({ rsvps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load RSVPs.' });
  }
});

app.get('/api/wishes', requireAdmin, async (req, res) => {
  try {
    const wishes = await queryAll('SELECT * FROM wishes ORDER BY created_at DESC');
    res.json({ wishes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load wishes.' });
  }
});

app.get('/api/admin/dashboard', requireAdmin, async (req, res) => {
  try {
    const events = await queryAll('SELECT * FROM events ORDER BY order_no ASC');
    const couple = await queryAll('SELECT * FROM couple ORDER BY order_no ASC');
    const gallery = await queryAll('SELECT * FROM gallery_images ORDER BY order_no ASC');
    const guests = await queryAll('SELECT * FROM guests ORDER BY created_at DESC');
    const rsvps = await queryAll(`
      SELECT r.*, g.name AS guest_name, g.token AS guest_token
      FROM rsvps r
      LEFT JOIN guests g ON g.id = r.guest_id
      ORDER BY r.created_at DESC LIMIT 50
    `);
    const wishes = await queryAll(`
      SELECT w.*, g.name AS guest_name, g.token AS guest_token
      FROM wishes w
      LEFT JOIN guests g ON g.id = w.guest_id
      ORDER BY w.created_at DESC LIMIT 50
    `);
    const settingsRows = await queryAll('SELECT key, value FROM settings');
    const settings = {};
    settingsRows.forEach((row) => (settings[row.key] = row.value));
    const gifts = await queryAll('SELECT * FROM gifts ORDER BY order_no ASC');

    res.json({ events, couple, gallery, guests, rsvps, wishes, settings, gifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load admin dashboard.' });
  }
});

app.post('/api/admin/wishes/:id/reply', requireAdmin, async (req, res) => {
  const { reply } = req.body;
  const { id } = req.params;
  const repliedAt = new Date().toISOString();
  try {
    await runSql('UPDATE wishes SET reply = ?, replied_at = ? WHERE id = ?', [reply, repliedAt, id]);
    res.json({ success: true, replied_at: repliedAt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save reply.' });
  }
});

app.delete('/api/admin/wishes/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM wishes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete wish.' });
  }
});

app.delete('/api/admin/rsvps/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM rsvps WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete RSVP.' });
  }
});


app.get('/api/admin/guests', requireAdmin, async (req, res) => {
  try {
    const guests = await queryAll('SELECT * FROM guests ORDER BY created_at DESC');
    res.json({ guests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load guest list.' });
  }
});

app.post('/api/admin/guests', requireAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Guest name is required.' });
  }

  try {
    const firstName = extractFirstName(name);
    const token = await generateTokenFromFirstName(firstName);

    const createdAt = new Date().toISOString();
    const result = await runSql('INSERT INTO guests (name, first_name, token, created_at) VALUES (?, ?, ?, ?)', [name, firstName, token, createdAt]);
    const maskedToken = Buffer.from(token).toString('base64');
    const guest = { id: result.lastID, name, first_name: firstName, token, created_at: createdAt, link: `${req.protocol}://${req.get('host')}?v=${maskedToken}` };
    res.json({ success: true, guest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create guest.' });
  }
});

app.post('/api/admin/guests/import', requireAdmin, excelUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No Excel file uploaded.' });
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    
    let addCount = 0;
    
    await runSql('START TRANSACTION');
    
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || !row.length) continue;
        const rawName = String(row[0]).trim();
        // Skip header
        if (!rawName || rawName.toLowerCase() === 'name' || rawName.toLowerCase() === 'nama tamu' || rawName.toLowerCase() === 'nama') continue;
        
        const firstName = extractFirstName(rawName);
        const token = await generateTokenFromFirstName(firstName);
        const createdAt = new Date().toISOString();
        
        await runSql('INSERT INTO guests (name, first_name, token, created_at) VALUES (?, ?, ?, ?)', [rawName, firstName, token, createdAt]);
        addCount++;
    }
    
    await runSql('COMMIT');
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    
    res.json({ success: true, count: addCount });
  } catch (error) {
    console.error('Import Error:', error);
    await runSql('ROLLBACK').catch(e => console.error('Rollback Error:', e));
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: error.message || 'Failed to import Excel data.' });
  }
});

app.put('/api/admin/guests/:id', requireAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    await runSql('UPDATE guests SET name = ? WHERE id = ?', [name, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update guest.' });
  }
});

app.delete('/api/admin/guests/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM guests WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete guest.' });
  }
});

app.post('/api/admin/events/:id/icon', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE events SET icon_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event icon' });
  }
});

app.put('/api/admin/events/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, heading, time, date, date_iso, location_name, address, map_src, map_link, icon_src } = req.body;
  try {
    await runSql(
      `UPDATE events SET name = ?, heading = ?, time = ?, date = ?, date_iso = ?, location_name = ?, address = ?, map_src = ?, map_link = ?, icon_src = ? WHERE id = ?`,
      [name, heading, time, date, date_iso || null, location_name, address, map_src, map_link, icon_src, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event.' });
  }
});

app.post('/api/admin/couple/:id/photo', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE couple SET image_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update couple photo' });
  }
});

app.put('/api/admin/couple/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { role, name, description, parents, instagram, image_src } = req.body;
  try {
    await runSql(
      `UPDATE couple SET role = ?, name = ?, description = ?, parents = ?, instagram = ?, image_src = ? WHERE id = ?`,
      [role, name, description, parents, instagram, image_src, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update couple data.' });
  }
});

app.post('/api/admin/gallery', requireAdmin, upload.single('image'), async (req, res) => {
  const file = req.file;
  const { alt } = req.body;
  if (!file || !alt) {
    return res.status(400).json({ error: 'File gambar dan alt text diperlukan.' });
  }

  const src = `/uploads/${file.filename}`;
  try {
    const countRow = await queryGet('SELECT COUNT(*) AS count FROM gallery_images');
    const orderNo = countRow.count + 1;
    const result = await runSql('INSERT INTO gallery_images (src, alt, order_no) VALUES (?, ?, ?)', [src, alt, orderNo]);
    res.json({ success: true, id: result.lastID, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add gallery image.' });
  }
});

app.put('/api/admin/gallery/reorder', requireAdmin, async (req, res) => {
  const { sequence } = req.body;
  if (!Array.isArray(sequence)) return res.status(400).json({ error: 'Invalid sequence format' });
  try {
    for (let i = 0; i < sequence.length; i++) {
        await runSql('UPDATE gallery_images SET order_no = ? WHERE id = ?', [i + 1, sequence[i]]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder gallery images.' });
  }
});

app.put('/api/admin/gallery/:id/meta', requireAdmin, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { alt } = req.body;
  const file = req.file;

  try {
    if (file) {
      const src = `/uploads/${file.filename}`;
      await runSql('UPDATE gallery_images SET src = ?, alt = ? WHERE id = ?', [src, alt, id]);
    } else {
      await runSql('UPDATE gallery_images SET alt = ? WHERE id = ?', [alt, id]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update gallery image metadata.' });
  }
});


app.delete('/api/admin/gallery/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await runSql('DELETE FROM gallery_images WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete gallery image.' });
  }
});

// ============================================================
// LOVE STORY API
// ============================================================
app.get('/api/lovestory', async (req, res) => {
  try {
    const messages = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const settingsRows = await queryAll('SELECT key, value FROM lovestory_settings');
    const settings = {};
    settingsRows.forEach(r => { settings[r.key] = r.value; });
    res.json({ messages, settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load love story.' });
  }
});

app.get('/api/admin/lovestory', requireAdmin, async (req, res) => {
  try {
    const messages = await queryAll('SELECT * FROM lovestory ORDER BY order_no ASC, id ASC');
    const settingsRows = await queryAll('SELECT key, value FROM lovestory_settings');
    const settings = {};
    settingsRows.forEach(r => { settings[r.key] = r.value; });
    res.json({ messages, settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load love story.' });
  }
});

app.put('/api/admin/lovestory', requireAdmin, async (req, res) => {
  const { title, messages } = req.body;
  try {
    await runSql('START TRANSACTION');
    
    if (title !== undefined) {
      await runSql('INSERT INTO lovestory_settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', ['chat_title', title]);
    }

    if (req.body.lovestory_bg !== undefined) {
      await runSql('INSERT INTO lovestory_settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', ['lovestory_bg', req.body.lovestory_bg]);
    }
    
    if (Array.isArray(messages)) {
      await runSql('DELETE FROM lovestory');
      for (let i = 0; i < messages.length; i++) {
        const m = messages[i];
        await runSql('INSERT INTO lovestory (type, sender, message, time, date_label, order_no) VALUES (?, ?, ?, ?, ?, ?)', [m.type || 'chat', m.sender || '', m.message || '', m.time || '', m.date_label || '', i]);
      }
    }
    
    await runSql('COMMIT');
    res.json({ success: true });
  } catch (error) {
    await runSql('ROLLBACK').catch(() => {});
    console.error(error);
    res.status(500).json({ error: 'Failed to save love story.' });
  }
});

app.post('/api/admin/lovestory/settings', requireAdmin, async (req, res) => {
  const entries = Object.entries(req.body);
  try {
    for (const [key, value] of entries) {
      await runSql('INSERT INTO lovestory_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [key, value]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save love story settings.' });
  }
});

app.post('/api/admin/lovestory/avatar/:role', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const { role } = req.params; // 'male' or 'female'
  const src = `/uploads/${req.file.filename}`;
  try {
    await runSql('INSERT INTO lovestory_settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [`${role}_avatar`, src]);
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update avatar.' });
  }
});

app.post('/api/admin/music/upload', requireAdmin, audioUpload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const src = `/audio/${req.file.filename}`;
  try {
    // 1. Get old music path
    const oldMusic = await queryGet('SELECT value FROM settings WHERE key = ?', ['bg_music']);
    
    // 2. Delete old file if exists
    if (oldMusic && oldMusic.value) {
      // Remove leading slash to correctly join with __dirname
      const relativePath = oldMusic.value.startsWith('/') ? oldMusic.value.substring(1) : oldMusic.value;
      const oldPath = path.join(__dirname, relativePath);
      console.log('Checking old music path for deletion:', oldPath);
      
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
          console.log('Success deleted old music:', oldPath);
        } catch (e) {
          console.error('Failed to delete old music file:', e);
        }
      }
    }

    // 3. Save new path to DB
    await runSql('INSERT INTO settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', ['bg_music', src]);
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save music settings.' });
  }
});

app.post('/api/admin/lovestory/messages', requireAdmin, async (req, res) => {
  const messages = req.body.messages;
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'Messages array required.' });
  try {
    await runSql('DELETE FROM lovestory');
    const stmt = db.prepare('INSERT INTO lovestory (type, sender, message, time, date_label, order_no) VALUES (?, ?, ?, ?, ?, ?)');
    messages.forEach((m, i) => {
      stmt.run(m.type || 'chat', m.sender || '', m.message || '', m.time || '', m.date_label || '', i);
    });
    stmt.finalize();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save messages.' });
  }
});

app.post('/api/admin/settings/upload', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `/uploads/${req.file.filename}`;
  const { setting_key } = req.body;
  try {
    if (setting_key) {
      await runSql('INSERT INTO settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [setting_key, src]);
    }
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload setting image' });
  }
});

app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  const entries = Object.entries(req.body);
  try {
    for (const [key, value] of entries) {
      await runSql('INSERT INTO settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [key, value]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update settings.' });
  }
});

app.post('/api/admin/gifts', requireAdmin, async (req, res) => {
  const { bank_name, account_number, account_name, logo_src } = req.body;
  try {
    const countRow = await queryGet('SELECT COUNT(*) AS count FROM gifts');
    const orderNo = countRow.count + 1;
    const result = await runSql('INSERT INTO gifts (bank_name, account_number, account_name, logo_src, order_no) VALUES (?, ?, ?, ?, ?)', [bank_name, account_number, account_name, logo_src || '', orderNo]);
    res.json({ success: true, id: result.lastID, gift: { id: result.lastID, bank_name, account_number, account_name, logo_src: logo_src || '', order_no: orderNo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add gift.' });
  }
});

app.put('/api/admin/gifts/:id', requireAdmin, async (req, res) => {
  const { bank_name, account_number, account_name, logo_src } = req.body;
  try {
    await runSql('UPDATE gifts SET bank_name = ?, account_number = ?, account_name = ?, logo_src = ? WHERE id = ?', [bank_name, account_number, account_name, logo_src, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update gift.' });
  }
});

app.post('/api/admin/gifts/reorder', requireAdmin, async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'Invalid data format' });
  try {
    for (let index = 0; index < ids.length; index++) {
      await runSql('UPDATE gifts SET order_no = ? WHERE id = ?', [index, ids[index]]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder gifts' });
  }
});


app.post('/api/admin/gifts/:id/logo', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const src = `uploads/${req.file.filename}`;
  try {
    await runSql('UPDATE gifts SET logo_src = ? WHERE id = ?', [src, req.params.id]);
    res.json({ success: true, src });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload gift logo' });
  }
});

app.delete('/api/admin/gifts/:id', requireAdmin, async (req, res) => {
  try {
    await runSql('DELETE FROM gifts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete gift.' });
  }
});

app.put('/api/admin/gifts/reorder', requireAdmin, async (req, res) => {
  const { sequence } = req.body;
  if (!Array.isArray(sequence)) return res.status(400).json({ error: 'Invalid sequence format' });
  try {
    for (let i = 0; i < sequence.length; i++) {
        await runSql('UPDATE gifts SET order_no = ? WHERE id = ?', [i + 1, sequence[i]]);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder gifts.' });
  }
});

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(400).json({ error: err.message || 'Terjadi kesalahan upload.' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
