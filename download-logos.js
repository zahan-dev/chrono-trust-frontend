const fs = require('fs');
const https = require('https');

const logos = [
  { name: 'rolex', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Rolex_logo.svg/512px-Rolex_logo.svg.png' },
  { name: 'omega', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Omega_logo.svg/512px-Omega_logo.svg.png' },
  { name: 'cartier', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cartier_logo.svg/512px-Cartier_logo.svg.png' },
  { name: 'patek', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Patek_Philippe_logo.svg/512px-Patek_Philippe_logo.svg.png' },
  { name: 'audemars', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Audemars_Piguet_logo.svg/512px-Audemars_Piguet_logo.svg.png' },
  { name: 'tagheuer', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/TAG_Heuer_logo.svg/512px-TAG_Heuer_logo.svg.png' },
  { name: 'breitling', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Breitling_logo.svg/512px-Breitling_logo.svg.png' },
  { name: 'tudor', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tudor_logo.svg/512px-Tudor_logo.svg.png' }
];

if (!fs.existsSync('./public/brands')) {
  fs.mkdirSync('./public/brands');
}

logos.forEach(logo => {
  https.get(logo.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(`./public/brands/${logo.name}.png`);
      res.pipe(file);
    } else {
      console.log(`Failed to download ${logo.name}: ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(e);
  });
});
console.log('Download initiated.');
