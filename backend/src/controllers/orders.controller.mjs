import fs from 'node:fs/promises'
import path from 'node:path'
import { Parser } from 'json2csv'
import { IsApiService } from '../services/is-api.service.mjs'
import { extractOrderSummary } from '../utils.mjs'

const ordersFile = path.resolve('data/orders.json')
const api = new IsApiService()

export const fetchAllOrders = async (req, res) => {
	try {
		const rawOrders = await api.fetchAllOrders()

		console.log(`Found ${rawOrders.length} raw orders`)

		res.json(rawOrders)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Failed to get orders' })
	}
}

export const fetchOrderByIdOrSerialNumber = async (req, res) => {
	try {
		const { id, serial } = req.query

		const rawOrder = await api.fetchOneOrder(id, serial)

		if (!rawOrder) {
			return res.status(404).json({ error: 'Order not found' })
		}
		const parsed = extractOrderSummary(rawOrder)

		res.json(parsed)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Failed to get order' })
	}
}

export const getAllOrdersAsCsv = async (req, res) => {
	try {
		const { minWorth = 0, maxWorth = Infinity } = req.query

		const data = await fs.readFile(ordersFile, 'utf-8')
		const orders = JSON.parse(data)

		const filtered = orders.filter(o => o.orderWorth >= +minWorth && o.orderWorth <= +maxWorth)

		const parser = new Parser({ fields: ['orderId', 'orderWorth'] })
		const csv = parser.parse(filtered)

		res.header('Content-Type', 'text/csv')
		res.attachment('orders.csv')
		res.send(csv)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Failed to export orders as CSV' })
	}
}

export const getOneOrderAsCsv = async (req, res) => {
	try {
		const { id } = req.params

		const data = await fs.readFile(ordersFile, 'utf-8')
		const orders = JSON.parse(data)

		const found = orders.find(o => o.orderId === id)

		if (!found) return res.status(404).json({ error: 'Order not found' })

		const rows = found.products.map(p => ({
			orderId: found.orderId,
			productId: p.productId,
			quantity: p.quantity,
			orderWorth: found.orderWorth
		}))

		const parser = new Parser({ fields: ['orderId', 'productId', 'quantity', 'orderWorth'] })
		const csv = parser.parse(rows)

		res.header('Content-Type', 'text/csv')
		res.attachment(`${id}.csv`)
		res.send(csv)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Failed to get order as CSV' })
	}
}
