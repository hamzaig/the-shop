import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer';
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;



  const redirect = searchParams.get("redirect") ? `/${searchParams.get("redirect")}` : '/';


  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign in</Button>
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginPage