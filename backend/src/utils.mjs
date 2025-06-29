export function extractOrderSummary(rawOrder) {
	return {
		orderId: rawOrder.orderId,
		products: rawOrder.orderDetails.productsResults.map(p => ({
			productId: p.productId,
			quantity: p.productQuantity
		})),
		orderWorth: rawOrder.orderDetails.payments.orderCurrency.orderProductsCost
	}
}
