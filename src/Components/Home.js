import React, { Component } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
        <Card style={{ width: '18rem' }}>

          
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
          <Card.Title>Card Title</Card.Title>
      <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
      </Card.Text>
      <div class="form-row">
        <a href="#" class="ml-sm-5 btn btn-info btn-sm">
          <span class="fa fa-shopping-cart"></span> Add To Cart
        </a>
        <a href="#" class="ml-sm-5 btn btn-info btn-sm">
          <span class="fa fa-heart-o"></span> 
        </a>
        </div>
    </Card.Body>
    </Card>

   
    );
  }
}

export default Home;