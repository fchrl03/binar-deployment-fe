import React from 'react';
import PropTypes from 'prop-types';
import { BiPurchaseTag } from 'react-icons/bi';

function CarItemBody({ name, price, year }) {
  return (
    <div>
      <h3>Name: {name}</h3>
      <div className="flex items-center">
        <BiPurchaseTag />
        <p> Price: {price}</p>
      </div>
      <h3>Year: {year}</h3>
    </div>
  );
}

CarItemBody.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default CarItemBody;
