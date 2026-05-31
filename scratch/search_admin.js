const fs = require('fs');
const content = fs.readFileSync('admin.html', 'utf8');
const lines = content.split('\n');
for (let i = 2550; i <= 2600; i++) {
    console.log(`Line ${i + 1}: ${lines[i] ? lines[i].trim() : ''}`);
}
