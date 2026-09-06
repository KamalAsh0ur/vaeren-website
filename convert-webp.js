const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function findImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findImages(file));
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      results.push(file);
    }
  }
  return results;
}

async function convert() {
  const files = findImages('./public');
  for (let file of files) {
    const parsed = path.parse(file);
    const outPath = path.join(parsed.dir, parsed.name + '.webp');
    await sharp(file).webp({ quality: 90 }).toFile(outPath);
    fs.unlinkSync(file); // delete original
    console.log(`Converted ${file}`);
  }
}
convert();
