import { Router } from 'express'
import { fetchAllOrders, fetchOrderByIdOrSerialNumber, getAllOrdersAsCsv, getOneOrderAsCsv } from '../controllers/orders.controller.mjs'
import { basicAuth } from '../middleware/basicAuth.mjs'
import { syncOrders } from '../tasks/syncOrders.mjs'

const router = Router()

router.get('/fetch-many', basicAuth, fetchAllOrders)
router.get('/fetch-one', basicAuth, fetchOrderByIdOrSerialNumber)
router.post('/sync', basicAuth, async (req, res) => {
	try {
		await syncOrders()
		res.status(200).json({ message: 'Sync completed' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Sync failed' })
	}
})
router.get('/csv', basicAuth, getAllOrdersAsCsv)
router.get('/csv/:id', basicAuth, getOneOrderAsCsv)

export { router as ordersRoutes }
