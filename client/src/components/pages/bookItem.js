import React, {Component} from 'react';
import {Image, Well, Col, Row, Button} from 'react-bootstrap';
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
			images: this.props.images,
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
				this.props.updateCart(_id, 1, this.props.cart);
			}
		} else {
			//CART IS EMPTY
			this.props.addToCart(book);
		}
	}
	constructor(){
		super();
		this.state = {
			isClicked:false
		};
	}

	onReadmore(){
		this.setState({isClicked: !this.state.isClicked});
	}

	render() {
		return (
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive/>
					</Col>
					<Col xs={6} sm={8}>
						<h4 onClick={this.onReadmore.bind(this)}>{(this.props.title.length > 12 && this.state.isClicked === false)?(this.props.title.substring(0,12)+'...'):(this.props.title)}
							
						</h4>
						<h6>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
							<button className="link" onClick={this.onReadmore.bind(this)}>
								{(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...read more'):('...read less')}
							</button>
						</h6>
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