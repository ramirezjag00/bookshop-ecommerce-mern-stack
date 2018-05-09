import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BooksForm from './pages/booksForm';
import BooksList from './pages/booksList';
import Cart from './pages/cart';
import Menu from './menu';
import Footer from './footer';


class App extends Component {
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

export default connect(mapStateToProps, actions)(App);

