import React from 'react';
import img from '../assets/images1/aboutimage.jpg'
import NavBar from './NavBar';
const AboutSection = () => {
  return (
    <>
    <NavBar/>
    <section className="about_section layout_padding" style={{marginTop:'10%',marginBottom:'10%'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 px-0">
            <div className="img_container">
              <div className="img-box">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-6 px-0">
            <div className="detail-box">
              <div className="heading_container">
                <h2>Who Are We?</h2>
              </div>
              <p>
              Welcome to GoGlide, your ultimate destination for hassle-free and exciting bike rentals! At GoGlide, we believe in providing a seamless and enjoyable experience for riders who are passionate about exploring the world on two wheels.
              </p>
              
              <div className="btn-box">
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutSection;
