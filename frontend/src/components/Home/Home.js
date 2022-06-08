import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productsActions';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './Home.css';
import Product from './Product';

// const product = {
//   name: 'Blue T-Shirt',
//   images: [{ url: 'https://i.ibb.co/DRST11n/1.webp' }],
//   price: 3000,
//   _id: 'absjek',
// };

export default function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title="E-COMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {error ? (
          <div>{error}</div>
        ) : products ? (
          products.map((product) => <Product product={product} />)
        ) : (
          <div>Product Not Found</div>
        )}
      </div>
    </>
  );
}
