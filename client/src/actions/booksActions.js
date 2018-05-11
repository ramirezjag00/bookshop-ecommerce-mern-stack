import axios from 'axios';

//GET BOOKS
export function getBooks(){
	return function(dispatch){
		axios.get("/api/books")
			.then(function(response){
				dispatch({type:"GET_BOOKS", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"GET_BOOKS_REJECTED", payload:err})
			})
	}
}

//POST A BOOK
export function postBooks(book){
	//whenever the action creator postBooks is called, it will return a function, redux-thunk will check/use the function and will automatically call it with the dispatch. We then make a request,wait til we get response from the API, once we have the response, only in that point in  time we dispatch our action
	return function(dispatch) {
		//post http request using axios to "/books" as we have defined in the backend API, passing a book 
		axios.post("/api/books", book)
			.then(function(response){
				//if only the promise, request response data, is fulfilled, dispatch payload.
				//we only care about that "data" property from the res output of axios request so we only need to pass the res.data
				dispatch({
					type:"POST_BOOK", 
					payload: response.data
				})
			})
			//if in case there is an error, call this action and show an error message from the payload
			.catch(function(err){
				dispatch({
					type:"POST_BOOK_REJECTED",
					payload: "there was an error while posting a new book"
				})
			})
	}
}


//DELETE A BOOK
export function deleteBooks(id) {
	return function(dispatch) {
		axios.delete("/api/books/" + id)
			.then(function(response){
				dispatch({type:"DELETE_BOOK", payload:id})
			})
			.catch(function(err){
				dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
			})
	}
}

//UPDATE A BOOK
export function updateBooks(book) {
	return {
		type:"UPDATE_BOOK",
		payload: book 
	}
} 

//RESET FORM BUTTON
export function resetButton() {
	return {
		type:"RESET_BUTTON"
	}
} 