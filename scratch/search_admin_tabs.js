const fs = require('fs');
const content = fs.readFileSync('admin.html', 'utf8');
const lines = content.split('\n');
for (let i = 2700; i <= 2900; i++) {
    if (lines[i] !== undefined) {
        console.log(`Line ${i + 1}: ${lines[i].trim()}`);
    }
}
