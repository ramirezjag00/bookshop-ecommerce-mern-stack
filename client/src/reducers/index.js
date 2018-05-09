import {combineReducers} from 'redux';

import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

//combine reducers
export default combineReducers({
	books: booksReducers,
	cart: cartReducers
})