import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavLogin from './NavLogin';
const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType:''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least one symbol and one uppercase letter
    const symbolPattern = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const Number = /[0-9]/;
    const uppercasePattern = /[A-Z]/;
    return symbolPattern.test(password) && uppercasePattern.test(password)  && Number.test(password) ;
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Perform email and password validation
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);

    setErrors({
      email: emailValid ? '' : 'Invalid email',
      password: passwordValid ? '' : 'Password must contain at least one symbol and one uppercase letter',
    });

    if (emailValid && passwordValid) {
      axios.post('https://goglide.onrender.com/signin/verify', formData)
            .then(response => {
                console.log('Registration successful:', response.data);
                if (response.data === true) {
                    alert('Registration Successful! Please check your registered email.');
                    navigate('/'); // Navigate to the login page
                } else if (response.data === false) {
                    alert('User already exists');
                }
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });

        setFormData({
            name: "",
            email: "",
            password: ""
        });
      navigate('/');
    }
  };

  return (
    <>
    <NavLogin/>
    <div className="Reg-container" >
      <div className="row">
        <div className="col-md-6 offset-md-3" style={{margin: '5% 15%'}}>
          <h2 style={{ color: 'antiquewhite' }}>Create an Account</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            
            <Link to="/">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleRegister}
                style={{ marginLeft: '15px' }}
              >
                Create Account
              </button>
              <button href="/" type="button" className="btn btn-primary" style={{marginLeft:'8px'}}>
              Login
            </button>
            </Link>
            
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateAccount;
