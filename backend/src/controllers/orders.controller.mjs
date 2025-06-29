import { IsApiService } from '../services/is-api.service.mjs'
import { extractOrderSummary } from '../utils.mjs'

const api = new IsApiService()

export const fetchAllOrders = async (req, res) => {
	try {
		const rawOrders = await api.fetchAllOrders()

		console.log('Raw orders:', rawOrders)

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
		// res.json(rawOrder)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Failed to get order' })
	}
}
