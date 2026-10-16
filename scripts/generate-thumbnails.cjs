const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

async function main() {
  const directory = path.join(__dirname, '..', 'public')
  for (const name of fs.readdirSync(directory).filter(name => name.endsWith('.avif') && !name.endsWith('.thumb.avif'))) {
    const destination = path.join(directory, name.replace(/\.avif$/, '.thumb.avif'))
    await sharp(path.join(directory, name)).resize(192, 192, { fit: 'cover' }).avif({ quality: 60 }).toFile(destination)
    console.log(`${path.basename(destination)}: ${fs.statSync(destination).size} bytes`)
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
