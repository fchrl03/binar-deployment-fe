import React from 'react';
import PropTypes from 'prop-types';
import CarItemImage from './CarItemImage';
import CarItemBody from './CarItemBody';

function CarItem({ imageUrl, name, price, year }) {
  return (
    <div className="border-solid border-2 rounded max-w-md w-50">
      <CarItemImage imageUrl={imageUrl} />
      <CarItemBody name={name} price={price} year={year} />
    </div>
  );
}

CarItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CarItem;
