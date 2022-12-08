import React from 'react';

function CarItemImage({ imageUrl }) {
  return (
    <div>
      <img src={imageUrl} alt="Car avatar" />
    </div>
  );
}

export default CarItemImage;
