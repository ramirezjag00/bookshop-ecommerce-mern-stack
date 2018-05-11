// CART REDUCERS

export function cartReducers(state={cart:[]}, action) {
	switch(action.type){
		case "GET_CART":
		return {
			...state, 
			cart: action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}

		case "ADD_TO_CART":
		return {
			...state, 
			cart: action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}
		
		case "UPDATE_CART":
		return {
			...state,
			cart: action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}

		case "DELETE_CART_ITEM":
		return {
			...state,
			cart: action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}
		default: 
			return state; 
	}
}

//CALCULATE TOTALS
export function totals(payloadArr){
	const totalAmount = payloadArr.map(function(cartArr){
		return cartArr.price * cartArr.quantity;
	}).reduce(function(a,b) {
		return a + b;
	}, 0); //start summing from index0

	const totalQty = payloadArr.map(function(qty){
		return qty.quantity;
	}).reduce(function(a,b) {
		return a + b;
	}, 0)

	return {amount: totalAmount.toFixed(2), qty:totalQty}
} 