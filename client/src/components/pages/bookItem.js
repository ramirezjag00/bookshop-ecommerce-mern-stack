import React, {Component} from 'react';
import {Well, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends Component {
	handleCart(){
		//book is an array made by current array in the state then append the new book to the cart every time we press the button
		const book = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price,
			quantity: 1
		}]
		//CHECK IF CART IS EMPTY
		if(this.props.cart.length > 0){
			//CART IS NOT EMPTY
			let _id = this.props._id;

			let cartIndex = this.props.cart.findIndex(function(cart){
				return cart._id === _id;
			})
			//IF RETURNS -1 THERE ARE NO ITEMS WITH THE SAME ID
			if (cartIndex === -1) {
				this.props.addToCart(book);
			} else {
				//WE NEED TO UPDATE QUANTITY
				this.props.updateCart(_id, 1)
			}
		} else {
			//CART IS EMPTY
			this.props.addToCart(book);
		}

		
	}

	render() {
		return (
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h6>usd. {this.props.price}</h6>
					{/*everytime we click the button in the bookitem we want to fire a function that dispatches the autocart actions */}
						<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// addToCart:addToCart
		addToCart,
		//updateCart:updateCart
		updateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);