import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from '../actions/cartActions';

// const [searchParams, setSearchParams] = useSearchParams();
// searchParams.get("__firebase_request_key")
const CartPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty");

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }
  // console.log(cartItems);
  return (
    <Row>
      <Col md={8}>
        <h1>Shoping Cart</h1>
        {cartItems.length === 0 ? (<Message>Your cart is empty <Link to="/">Go Back</Link></Message>) : (<ListGroup variant="flush">
          {cartItems.map(x => (
            <ListGroup.Item key={x.product}>
              <Row>
                <Col md={2}>
                  <Image src={x.image} alt={x.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${x.product}`}>{x.name}</Link>
                </Col>
                <Col md={2}>{x.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={x.qty}
                    onChange={(e) => dispatch(addToCart(x.product, Number(e.target.value)))}
                  >
                    {
                      [...Array(x.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))
                    }
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type="button" variant='light' onClick={() => removeFromCartHandler(x.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>)}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, curr) => acc + Number(curr.qty), 0)}) items</h2>
              $
              {cartItems.reduce((acc, curr) => acc + Number(curr.qty) * Number(curr.price), 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Row>
              <Button type="button" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Check
              </Button>
            </Row>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage