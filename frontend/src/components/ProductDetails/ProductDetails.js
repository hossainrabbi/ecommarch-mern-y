import { Rating } from '@mui/material';
import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productsActions';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './ProductDetails.css';
import ReviewCard from './ReviewCard';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (store) => store.productDetails
  );

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return error ? (
    <div>{error.message}</div>
  ) : product ? (
    <>
      <MetaData title={`${product.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  src={item.url}
                  className="CarouselImage"
                  alt={`${i + 1} slide`}
                  key={i}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {' '}
              ({product.numOfReview} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`$${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input readOnly type="number" value={1} />
                <button>+</button>
              </div>
              <button
                disabled={product.Stock < 1 ? true : false}
                // onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button
            // onClick={submitReviewToggle}
            className="submitReview"
          >
            Submit Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>
  ) : (
    <div>Product Not Found</div>
  );
}
