const http = require('http');

http.get('http://localhost:3000/api/public', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('--- API RESPONSE CHECK ---');
      console.log('event_bg_mode:', json.settings.event_bg_mode);
      console.log('event_bg:', json.settings.event_bg);
      console.log('lovestory_bg_mode:', json.lovestory_settings.lovestory_bg_mode);
      console.log('lovestory_bg_img:', json.lovestory_settings.lovestory_bg_img);
      const matched = json.settings.event_bg === json.lovestory_settings.lovestory_bg_img;
      console.log('Urls match exactly:', matched);
      process.exit(matched ? 0 : 1);
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('API request failed:', err.message);
  process.exit(1);
});
