const db=require('./db'); 
db.query('SELECT value FROM settings WHERE `key`="opening_bg_img"').then(r=>{console.log(r[0]);process.exit()}).catch(e=>{console.error(e);process.exit()});
