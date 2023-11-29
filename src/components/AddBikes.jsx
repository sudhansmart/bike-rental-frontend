import React, { useState } from 'react';
import AdminNavBar from './AdminNavBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Form} from 'react-bootstrap'

function AddBikes() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    rentperhour: '',
    type: '',
    description: '',
    imagelink: '',
  });

  const [errors, setErrors] = useState({
    year: '',
    mileage: '',
    rentperhour: '',
    type: '',
    description: '',
    imagelink: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Input Field Validation 
  const validateMake = (make) => {
    const alphaPattern = /^[A-Za-z]+$/;
    return alphaPattern.test(make) ;
  }

  const validateYear = (year) => {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(year) ;
  }

  const validateMileage = (mileage) => {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(mileage) ;
  };
  const validateRentperhour = (rentperhour) => {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(rentperhour) ;
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const yearValid = validateYear(formData.year);
    const mileageValid = validateMileage(formData.mileage);
    const rentperhourValid = validateRentperhour(formData.rentperhour);
    const makeValid = validateMake(formData.make)
    setErrors({
      year: yearValid ? '' : 'Invalid year',
      mileage: mileageValid ? '' : 'Mileage should contain only numbers.',
      rentperhour: rentperhourValid ? '' : 'should contain only numbers',
      make : makeValid?  '' : 'invalid make',
    });

    if (yearValid && mileageValid && rentperhourValid && makeValid ) {
      axios.post('https://goglide.onrender.com/bikelist/addBike', formData);

      console.log('Bike added successfully', formData);

      setFormData({
        make: '',
        model: '',
        year: '',
        mileage: '',
        rentperhour: '',
        type: '',
        description: '',
        imagelink: '',
      });

      alert('Bike added successfully');
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="addbike-container">

        <div className="addbike">
          <div className="row">
            <div className="col-md-4" style={{ margin: '5% 3%' }}>
              <h2 style={{ color: 'antiquewhite' }}> Bike Details</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Make:</label>
                  <input
                    type="text"
                    name="make"
                    className="form-control"
                    value={formData.make}
                    onChange={handleInputChange}
                  />
                  {errors.make && <div className="text-danger">{errors.make}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Model:</label>
                  <input
                    type="text"
                    name="model"
                    className="form-control"
                    value={formData.model}
                    onChange={handleInputChange}
                  
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year:</label>
                  <input
                    type="text"
                    name="year"
                    className="form-control"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                  {errors.year && <div className="text-danger">{errors.year}</div>}
                </div>
                <div className="mb-2">
                  <label className="form-label">Mileage:</label>
                  <input
                    type="text"
                    name="mileage"
                    className="form-control"
                    value={formData.mileage}
                    onChange={handleInputChange}
                  /><span style={{color:'azure'}}>Kms/L</span>
                  {errors.mileage && <div className="text-danger">{errors.mileage}</div>}
                </div>
              </form>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleRegister}
                  style={{ marginLeft: '15px' }}
                >
                  Add Bike
                </button>
              </div>
            </div>
            <div className="col-md-6" style={{ margin: '5% 5%' }}>
              <h2 style={{ color: 'antiquewhite' }}>Rent Details</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Rent per Hour:</label>
                  <input
                    type="text"
                    name="rentperhour"
                    className="form-control"
                    value={formData.rentperhour}
                    onChange={handleInputChange}
                  />
                  {errors.rentperhour && (
                    <div className="text-danger">{errors.rentperhour}</div>
                  )}
                </div>
                <div className="mb-3"> <Form.Group controlId="formGridState">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      style={{backgroundColor:'#5d5d5d'}}
                    >
                      <option value="-">-Select Here- </option>
                      <option value="Sports">Sport</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Economuter">Economuter</option>
                      <option value="Commuter">Commuter</option>
                      <option value="Street">Street</option>
                      <option value="Cruiser">Cruiser</option>
                      <option value="Street">Street</option>
                      <option value="Touring">Touring </option>
                      <option value="Dirt">Dirt</option>
                      <option value="Dual-sport">Dual-sport</option>
                    </Form.Select>
                  </Form.Group>
                  {errors.type && (
                    <div className="text-danger">{errors.type}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">image link:</label>
                  <input
                    type="text"
                    name="imagelink"
                    className="form-control"
                    value={formData.imagelink}
                    onChange={handleInputChange}
                  />
                  {errors.imagelink && (
                    <div className="text-danger">{errors.imagelink}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBikes;
