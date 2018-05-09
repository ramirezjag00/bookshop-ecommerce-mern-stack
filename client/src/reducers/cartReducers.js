// CART REDUCERS

export function cartReducers(state={cart:[]}, action) {
	switch(action.type){
		case "ADD_TO_CART":
		return {
			...state, 
			cart: action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}
		
		case "UPDATE_CART":
		//create a copy of the current array of books
  const currentBookToUpdate = [...state.cart];
  //determine at which index in books array is the book to be updated
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book) {
      return book._id === action._id;
    }
  );
  //create a new books object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methods too
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
  };
  //use slice to remove the book at the specified index, replace with the new object and concatenate with the rest of items in the array
let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]

		return {
			...state,
			cart: cartUpdate,
			totalAmount: totals(cartUpdate).amount,
			totalQty: totals(cartUpdate).qty
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