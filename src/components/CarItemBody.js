import React from 'react';

function CarItemBody({ name, price, year }) {
  return (
    <div>
      <h3>Name: {name}</h3>
      <h3>Price: {price}</h3>
      <h3>Year: {year}</h3>
    </div>
  );
}

export default CarItemBody;
