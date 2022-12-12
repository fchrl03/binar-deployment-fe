import React from 'react';
import PropTypes from 'prop-types';

function CarItemImage({ imageUrl }) {
  return (
    <div>
      <img src={imageUrl} alt="Car avatar" />
    </div>
  );
}

CarItemImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default CarItemImage;
