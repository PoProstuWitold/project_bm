import fetch from 'node-fetch'

export class IsApiService {
	constructor() {
		this.apiUrl = process.env.IS_API_URL || ''
		this.apiKey = process.env.IS_API_KEY || ''
	}

	getHeaders() {
		return {
			'X-API-KEY': this.apiKey,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	}

	async fetchAllOrders() {
		const url = `${this.apiUrl}/orders/orders/search`

		const body = {
			params: {
				ordersBy: [
					{
						sortDirection: 'DESC',
						elementName: 'id'
					}
				],
				orderCurrency: 'PLN',
				showBundles: true
			}
		}


		const res = await fetch(url, {
			method: 'POST',
			headers: this.getHeaders(),
			body: JSON.stringify(body)
		})

		if (!res.ok) throw new Error(`Search failed: ${res.statusText}`)

		const data = await res.json()
		return data
	}


	async fetchOneOrder(orderId, serialNumber) {
		const url = new URL(`${this.apiUrl}/orders/orders`)
		const params = new URLSearchParams()

		if (orderId) params.append('ordersIds', orderId)
		if (serialNumber) params.append('ordersSerialNumbers', serialNumber)

		url.search = params.toString()

		const res = await fetch(url.toString(), {
			method: 'GET',
			headers: this.getHeaders(),
		})

		if (!res.ok) throw new Error(`Order fetch failed: ${res.statusText}`)

		const data = await res.json()
		return data.Results[0] || null
	}

	async getOrdersSummary() {
		const orders = await this.searchOrders()
		const result = []

		for (const order of orders) {
			const full = await this.getOrderDetails(order.orderId)
			const summary = {
				orderID: full.orderId,
				products: full.products.map(p => ({
					productID: p.productId,
					quantity: p.quantity
				})),
				orderWorth: full.orderSummary?.totalToPay?.gross || 0
			}
			result.push(summary)
		}

		return result
	}
}
