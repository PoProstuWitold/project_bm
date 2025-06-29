import { Router } from 'express'
import { fetchAllOrders, fetchOrderByIdOrSerialNumber } from '../controllers/orders.controller.mjs'
// import { basicAuth } from '../middleware/basicAuth.mjs'

const router = Router()

router.get('/fetch-many', fetchAllOrders)
router.get('/fetch-one', fetchOrderByIdOrSerialNumber)

export { router as ordersRoutes }
