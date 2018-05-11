import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row} from 'react-bootstrap';
import BookItem from './bookItem';
// import BooksForm from './booksForm';
// import Cart from './cart';

class BooksList extends Component {
	componentDidMount() {
		//Dispatch an action
		this.props.getBooks();
	}
	render() {
		const booksList = this.props.books.map(function(booksArr){
			return(
				<Col xs={12} sm={6} md={4} key={booksArr._id}>
					<BookItem
						_id={booksArr._id}
						title={booksArr.title}
						description={booksArr.description}
						images={booksArr.images}
						price={booksArr.price}
					/>       
				</Col>
			)
		})
		return(
			<Grid>
				<Row>
					<Carousel>
					  <Carousel.Item>
					    <img width={900} height={300} alt="900x300" src="/images/home_carousel1.jpg" />
					    <Carousel.Caption>
					      <h3>First slide label</h3>
					      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					  <Carousel.Item>
					    <img width={900} height={300} alt="900x300" src="/images/home_carousel2.jpg" />
					    <Carousel.Caption>
					      <h3>Second slide label</h3>
					      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					  <Carousel.Item>
					    <img width={900} height={300} alt="900x300" src="/images/home_carousel4.jpg" />
					    <Carousel.Caption>
					      <h3>Third slide label</h3>
					      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					  <Carousel.Item>
					    <img width={900} height={300} alt="900x300" src="/images/home_carousel5.jpg" />
					    <Carousel.Caption>
					      <h3>Fourth slide label</h3>
					      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					  <Carousel.Item>
					    <img width={900} height={300} alt="900x300" src="/images/home_carousel6.jpg" />
					    <Carousel.Caption>
					      <h3>Fifth slide label</h3>
					      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					</Carousel>
				</Row>
				{/*<Row>
					<Cart />
				</Row>*/}
				<Row style={{marginTop: '15px'}}>
					{booksList}
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		books: state.books.books
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks
		}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);