import React from 'react'
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../assets/images1/slide1.jpg'
import slide2 from '../assets/images1/slide2.jpg'
import slide3 from '../assets/images1/slide3.jpg'
function Slide() {
  const [bgIndex, setBgIndex] = useState(0);
  const backgroundImages = [slide1, slide2, slide3];
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImages[bgIndex]})`,
  };

  return (
    <div className="slide" style={backgroundStyle}>
      <div className="slidecontent">
              <div className='slide-text'>
                <h1>Glide Go</h1>
                <p>Better Bikes for</p>
                <p>Your Better</p>
                <p>Journey</p>
                <div> 
                <Link to="/bike">
                  <button className='custom-button' >OUR BIKES</button>
                  </Link>
                  </div>
              </div>
      </div>
     
    </div>
  );
}

export default Slide