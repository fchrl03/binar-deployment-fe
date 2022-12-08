import React from 'react';
import CarItemImage from './CarItemImage';
import CarItemBody from './CarItemBody';

function CarItem({ imageUrl, name, price, year }) {
  return (
    <div className="border-solid border-2 rounded">
      <CarItemImage imageUrl={imageUrl} />
      <CarItemBody name={name} price={price} year={year} />
    </div>
  );
}

export default CarItem;
