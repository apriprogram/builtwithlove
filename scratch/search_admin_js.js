const fs = require('fs');
const content = fs.readFileSync('admin.js', 'utf8');
const lines = content.split('\n');

console.log('--- ADMIN.JS SEARCH ---');
lines.forEach((line, idx) => {
    if (line.includes('setRsvpBgMode') || line.includes('syncRsvpColor') || line.includes('renderSettings') || line.includes('saveSettings')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
