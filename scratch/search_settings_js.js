const fs = require('fs');
const content = fs.readFileSync('js/admin/settings.js', 'utf8');
const lines = content.split('\n');

console.log('--- SETTINGS.JS SEARCH ---');
lines.forEach((line, idx) => {
    if (line.includes('window.renderSettings') || line.includes('window.saveSettings') || line.includes('setRsvpBgMode') || line.includes('syncRsvpColor')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
