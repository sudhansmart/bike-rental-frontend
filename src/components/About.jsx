import React from 'react'
import PhotoSlideshow from './PhotoSlideShow'

function About() {
  return (
    <div className='about' style={{marginBottom:'10%'}}>
        <div className='about-title'><h3>ABOUT US</h3></div>
        <div className='about-content'>
        <p> <span className='about-text'>Million</span> Ideas for Your</p>
        <p> Single <span className='about-text' style={{paddingLeft:'35px'}}>Journey</span> </p>     
        </div>  
        <PhotoSlideshow/>
     </div>
  )
}

export default About