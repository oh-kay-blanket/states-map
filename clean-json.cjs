const fs = require('fs')

// Load and clean the file
const raw = fs.readFileSync('./src/result.json', 'utf8')

// Remove control characters (except for \n and \t if you want to keep them)
const cleaned = raw.replace(/[\u0000-\u0019\u007F]/g, '')

// Optionally, validate JSON
let parsed
try {
	parsed = JSON.parse(cleaned)
} catch (err) {
	console.error('Invalid JSON after cleaning:', err.message)
	process.exit(1)
}

// Save cleaned version
fs.writeFileSync('cleaned.json', JSON.stringify(parsed, null, 2), 'utf8')
console.log('Cleaned JSON saved to cleaned.json')
