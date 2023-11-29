import React, { useState, useEffect } from 'react';
import img1 from '../assets/images1/img1.jpg';
import img2 from '../assets/images1/img2.jpg';
import img3 from '../assets/images1/img3.jpg';
import img4 from '../assets/images1/img4.jpeg';
import img5 from '../assets/images1/img5.jpg';
import img6 from '../assets/images1/img6.jpg';

function PhotoSlideshow() {
  const images = [img1, img2, img3, img4, img5, img6];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="image-slider">
      <div className="slider-frame">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide1 ${index === currentIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
              transform: `translateX(-${100 * (currentIndex - index)}%)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default PhotoSlideshow;
