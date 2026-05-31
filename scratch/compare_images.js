const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
    try {
        const fullPath = path.join(__dirname, '..', filePath);
        if (!fs.existsSync(fullPath)) {
            return `File not found: ${fullPath}`;
        }
        const data = fs.readFileSync(fullPath);
        const md5 = crypto.createHash('md5').update(data).digest('hex');
        return { size: data.length, md5 };
    } catch (e) {
        return e.message;
    }
}

console.log('Event BG:', getHash('uploads/1780134185524-584457459.jpeg'));
console.log('Event BG Img (other):', getHash('uploads/1778272302229-65428683.jpeg'));
console.log('Lovestory BG:', getHash('uploads/1780249847932-786958300.jpeg'));
