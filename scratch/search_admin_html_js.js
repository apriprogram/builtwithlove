const fs = require('fs');
const content = fs.readFileSync('admin.html', 'utf8');
const lines = content.split('\n');

console.log('--- ADMIN.HTML ALL MATCHES ---');
lines.forEach((line, idx) => {
    if (line.includes('renderSettings') || line.includes('saveSettings') || line.includes('setRsvpBgMode') || line.includes('syncRsvpColor')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
