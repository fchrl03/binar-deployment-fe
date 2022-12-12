import React from 'react';
import PropTypes from 'prop-types';
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

CarList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CarList;
