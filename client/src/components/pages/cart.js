import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Panel, Col, Row, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends Component {
	componentDidMount(){
		this.props.getCart();
	}
	onDelete(_id) {

		//create a copy of the current array of cart
    const currentBookToDelete = this.props.cart;
    //determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    //use slice to remove the book at the specified index
  let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
  ...currentBookToDelete.slice(indexToDelete + 1)]

		//passing a new cart array after deletetion
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id, 1, this.props.cart);
	}

	onDecrement(_id, quantity){
		if(quantity > 1 ) {
			this.props.updateCart(_id, -1, this.props.cart); 	
		}
	}

	constructor() {
		super();
		this.state = {
			show: false
		}
	}

	handleShow(){
		this.setState({show: true})
	}

	handleClose(){
		this.setState({show: false})
	}

	render() {
		//render cart if atleast we have 1 item in it
		if(this.props.cart[0]){
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}
	renderEmpty() {
		return (<div></div>)
	}
	renderCart(){
		//map over the items and return a new Panel containing the information of items
		const cartItemsList = this.props.cart.map(function(cartArr){
			return(
				<Panel key={cartArr._id}>
				<Panel.Body>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartArr.title}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>usd. {cartArr.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</Button>
								<Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, cartArr._id)}>+</Button>
								<span>     </span>
								<Button 
									bsStyle="danger" 
									bsSize="small"
									onClick={this.onDelete.bind(this, cartArr._id)}
								>
								DELETE
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
					</Panel.Body>
				</Panel>
			)
			//this make sure our onClick event is with the right context
		}, this)
		return(
			<Panel bsStyle="primary">
				<Panel.Heading>
      				<Panel.Title>Cart</Panel.Title>
    			</Panel.Heading>
				<Panel.Body>
					{cartItemsList}
					<Row>
						<Col xs={12}>
							<h6>Total Amount: {this.props.totalAmount}</h6>
							<Button bsStyle="success" bsSize="small" onClick={this.handleShow.bind(this)}>
								PROCEED TO CHECKOUT
							</Button>
						</Col>
					</Row>
					<Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>Thank you!</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h6>Your order has been saved</h6>
			            	<p>You will receive an email confirmation</p>
			          </Modal.Body>
			          <Modal.Footer>
			          	<Col xs={6}>
			          		<h6>Total $:{this.props.totalAmount}</h6>
			          	</Col>
			            <Button onClick={this.handleClose.bind(this)}>Close</Button>
			          </Modal.Footer>
			        </Modal>
				</Panel.Body>
			</Panel>
		)
	}
}

//returns the cart array from the state
function mapStateToProps(state) {
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		deleteCartItem,
		// deleteCartItem:deleteCartItem
		updateCart,
		// updateCart: updateCart,
		getCart
		//getCart: getCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

