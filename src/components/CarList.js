import React from 'react';
import CarItem from './CarItem';

function CarList({ cars }) {
  return (
    <div className="flex items-center justify-evenly my-4">
      {cars.map((car) => (
        <CarItem key={car.id} {...car} />
      ))}
    </div>
  );
}

export default CarList;
