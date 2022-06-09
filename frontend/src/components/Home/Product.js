import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  const options = {
    size: 'small',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span>{product.numOfReview} Reviews</span>
      </div>
      <span>${product.price}</span>
    </Link>
  );
}
