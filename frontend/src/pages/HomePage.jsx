import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from "../actions/productActions";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams();


  const productList = useSelector(state => state.productList);
  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  return <>
    {!keyword && <ProductCarousel />}
    <h1>Latest Products</h1>
    {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :
      (<>
        <Row>
          {
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
              </Col>
            ))
          }
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      </>)
    }
  </>;
};

export default HomePage;
