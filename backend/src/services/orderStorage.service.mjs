import fs from 'node:fs/promises'
import path from 'node:path'

const FILE_PATH = path.join(process.cwd(), 'data/orders.json')

export async function loadOrders() {
	try {
		const data = await fs.readFile(FILE_PATH, 'utf8')
		return JSON.parse(data)
	} catch {
		return []
	}
}

export async function saveOrders(newOrders) {
	const existing = await loadOrders()
	const existingIds = new Set(existing.map(o => o.orderId))

	const merged = [
		...existing,
		...newOrders.filter(o => !existingIds.has(o.orderId))
	]

	await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
	await fs.writeFile(FILE_PATH, JSON.stringify(merged, null, 2))
}
