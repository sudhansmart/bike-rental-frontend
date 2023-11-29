import React, { useState,useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faIndianRupeeSign  } from '@fortawesome/free-solid-svg-icons';
function Bike() {
  const [data,setData]= useState([
    {
      make: '',
      model: '',
      year: '',
      mileage: '',
      rentperhour: '',
      type: '',
      description: '',
      imagelink : '',
    }
  ]);
  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get('https://goglide.onrender.com/bikelist/get'); 
      if (response.status === 200) {
        setData(response.data);
       
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };
  // Call the fetch data function within useEffect
  useEffect(() => {
    fetchDataFromServer();
  }, []); 
  return (
    <div><NavBar/>
     <div className='bike-container'>
      <h2 style={{color:'white'}}>Choose Your Travel <span style={{color:'green'}}>Partner</span></h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((bike) => (
          <div className='bike-list' key={bike.make} style={{ margin: '15px 30px', textAlign: 'center' }}>
            <img
              src={bike.imagelink}
              alt={bike.make}
              style={{ width: '300px', height: '250px', objectFit: 'cover',margin:'15px' }}
            />
            <h3>{bike.make} {bike.model}</h3>
            <p>Type : {bike.type} </p>
            <h3>Rent : <FontAwesomeIcon icon={faIndianRupeeSign} style={{fontSize:'15px'}}/> {bike.rentperhour}/Hour</h3>
           
            <p>Year : {bike.year}</p>
            <p className='description-container' >Description : {bike.description}</p>
           
           
            <button href="/checkout" className="btn btn-success" onClick={() => alert(`You are choosed ${bike.make} ${bike.model}. Our representative will call you shortly.Thank You Have a Safe Ride...`)}>Rent Now</button>
          </div>
        ))}
      </div>
    </div>
       </div>
  )
}

export default Bike