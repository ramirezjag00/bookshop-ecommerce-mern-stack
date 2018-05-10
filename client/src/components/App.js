import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../actions';
import BooksForm from './pages/booksForm';
import BooksList from './pages/booksList';
import Cart from './pages/cart';
import Menu from './menu';
import Footer from './footer';
import {bindActionCreators} from 'redux';
import {getCart} from '../actions/cartActions';


class App extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render(){
    return(
    	<div>
    		<BrowserRouter>
    			<div className="app_container">
              <Menu cartItemsNumber={this.props.totalQty}/>
              <Route exact path="/" component={BooksList} />
              <Route exact path="/admin" component={BooksForm} />
              <Route exact path="/cart" component={Cart} />
			        <Footer />
		        </div>
		    </BrowserRouter>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    getCart
    //getCart: getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, actions)(App);

