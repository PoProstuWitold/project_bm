export function extractOrderSummary(order) {
	if (!order?.orderId || !order?.orderDetails?.productsResults) return null

	return {
		orderId: order.orderId,
		products: order.orderDetails.productsResults.map(p => ({
			productId: p.productId,
			quantity: p.productQuantity
		})),
		orderWorth: order.orderDetails.payments.orderCurrency.orderProductsCost
	}
}
