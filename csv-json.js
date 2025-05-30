import fs from 'fs/promises'
import { parse } from 'csv-parse/sync'

function normalizeQuotes(text) {
	if (typeof text !== 'string') return text
	return text
		.replace(/[“”]/g, '"')
		.replace(/[‘’]/g, "'")
		.replace(/[«»]/g, '"')
		.replace(/[`´]/g, "'")
}

const raw = await fs.readFile('bills.csv', 'utf8')

const records = parse(raw, {
	columns: true,
	skip_empty_lines: true,
})

const cleaned = records.map((row) =>
	Object.fromEntries(
		Object.entries(row).map(([key, val]) => [key, normalizeQuotes(val)])
	)
)

await fs.writeFile(
	'bills-output.json',
	JSON.stringify(cleaned, null, 2),
	'utf8'
)

console.log('CSV converted to JSON as output.json')
