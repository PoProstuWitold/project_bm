import express, { json } from 'express'
import { ordersRoutes } from './routes/orders.routes.mjs'

const app = express()

app.use(json())

app.get('/', (req, res) => {
	res.status(200).send('ProjectBM backend')
})
app.get('/health', (req, res) => {
	res.status(200).json({ 
		status: 'ok' 
	})
})

// API routes
app.use('/api/orders', ordersRoutes)

export { app }
