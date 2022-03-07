import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderPage = () => {
  const { id: orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    // console.log(order);
    // console.log(successPay);
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [orderId, dispatch, successPay, order, successDeliver])

  const successPaymentHandler = (e) => {
    // e.prevantDefault();
    dispatch(payOrder(orderId, {
      id: "AKDKJLA",
      status: "COMPLETED",
      update_time: Date.now(),
      email_address: "hamzaig@yahoo.com"
    }))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  }

  return (loading ? <Loader /> : error ? <Message variant={"danger"}>{error}</Message> :
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p> <strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {" "} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {
                order.isDelivered ? (<Message variant={"success"}>Delivered on {order.deliveredAt}</Message>) : (<Message variant={"danger"}>Not Delivered</Message>)
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {
                order.isPaid ? (<Message variant={"success"}>Paid on {order.paidAt}</Message>) : (<Message variant={"danger"}>Not Paid</Message>)
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (<Message>Order is Empty</Message>) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {loadingPay ? <Loader /> : (
                    <Button type='submit' varinat="primary" onClick={successPaymentHandler}>Click to Pay</Button>
                  )}
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Row>
                    {loadingPay ? <Loader /> : (
                      <Button type='button' varinat="primary" onClick={deliverHandler}>Mark as Deliverd</Button>
                    )}
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage