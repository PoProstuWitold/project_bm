import fs from 'node:fs/promises'
import path from 'node:path'
import cron from 'node-cron'
import { IsApiService } from '../services/is-api.service.mjs'
import { extractOrderSummary } from '../utils.mjs'

const ordersFile = path.resolve('data/orders.json')

export async function syncOrders() {
	const api = new IsApiService()
	const fetchedOrders = await api.fetchAllOrders()
	console.log(`[SYNC_ORDERS] Fetched ${fetchedOrders.length} orders from IS API`)

	const parsedOrders = fetchedOrders.map(extractOrderSummary)
	console.log(`[SYNC_ORDERS] Parsed ${parsedOrders.length} orders`)

	let existingOrders = []
	try {
		const fileContent = await fs.readFile(ordersFile, 'utf-8')
		existingOrders = JSON.parse(fileContent)
	} catch {
		// brak pliku lub nieczytelny
	}

	const existingMap = new Map(existingOrders.map(o => [o.orderId, o]))

	for (const order of parsedOrders) {
		existingMap.set(order.orderId, order)
	}

	const updatedOrders = Array.from(existingMap.values())
	await fs.mkdir(path.dirname(ordersFile), { recursive: true })
	await fs.writeFile(ordersFile, JSON.stringify(updatedOrders, null, 2), 'utf-8')

	console.log(`[SYNC_ORDERS] Saved ${updatedOrders.length} orders with unique IDs to ${ordersFile}`)
}

cron.schedule('0 0 * * *', async () => {
	console.log('[CRON] Starting order sync at', new Date().toISOString())
	await syncOrders()
	console.log('[CRON] Done!')
}, {
	scheduled: true,
	timezone: 'Europe/Warsaw'
})
