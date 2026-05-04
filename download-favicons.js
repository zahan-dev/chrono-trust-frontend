const fs = require('fs');
const https = require('https');

const domains = [
  { name: 'rolex', domain: 'rolex.com' },
  { name: 'omega', domain: 'omegawatches.com' },
  { name: 'cartier', domain: 'cartier.com' },
  { name: 'patek', domain: 'patek.com' },
  { name: 'audemars', domain: 'audemarspiguet.com' },
  { name: 'tagheuer', domain: 'tagheuer.com' },
  { name: 'breitling', domain: 'breitling.com' },
  { name: 'tudor', domain: 'tudorwatch.com' }
];

domains.forEach(d => {
  const url = `https://www.google.com/s2/favicons?domain=${d.domain}&sz=256`;
  https.get(url, (res) => {
    const file = fs.createWriteStream(`./public/brands/${d.name}.png`);
    res.pipe(file);
  });
});
