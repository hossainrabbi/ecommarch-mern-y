import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productsActions';
import Product from '../Home/Product';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './Products.css';

export default function Products() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((store) => store.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return error ? (
    <div>{error.message}</div>
  ) : products.length ? (
    <>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <h2 className="productsHeading">Products</h2>

      <div className="products">
        {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </>
  ) : (
    <div>Product not Found!</div>
  );
}
