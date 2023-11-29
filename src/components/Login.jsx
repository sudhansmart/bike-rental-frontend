import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavLogin from './NavLogin';

const LoginForm = ({ setRole,setToken,setAdminloggedin,setUserloggedin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    server: '', // Added for server-side errors
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const onLoginSuccess = (role) => {
        
    console.log('Login successful. Role:', role);
    // Optionally, setToken(role); // If you need to set a token
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const emailValid = validateEmail(formData.email);
    setErrors({
      email: emailValid ? '' : 'Invalid email',
      server: '', // Clear server-side error on each login attempt
    });

    if (emailValid) {
      try {
        const response = await axios.post('https://goglide.onrender.com/login/', formData);
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token)
        onLoginSuccess(response.data.role);
    
        if (response.data.status) {
          alert('Login Successful');
          if (response.data.role === 'admin') {
            setAdminloggedin(true)
            setRole(response.data.role);
            navigate('/adminpage'); 
          } else {
            setUserloggedin(true)
            navigate('/userpage'); 
          }
        } else {
          alert('Invalid Username or Password');
        }

        setFormData({
          email: '',
          password: '',
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrors({
            ...errors,
            server: 'User does not exist. Please check your email.',
          });
        } else if (error.response && error.response.status === 401) {
          setErrors({
            ...errors,
            server: 'Invalid password. Please try again.',
          });
        } else {
          setErrors({
            ...errors,
            server: 'An unexpected error occurred. Please try again later.',
          });
        }
      }
    }
  };

  return (
    <>
      <NavLogin />
      <div className="login-container">
        <div className="row" style={{ margin: '0px 200px' }}>
          <div className="col-md-6 offset-md-3" style={{ margin: '10% 15%' }}>
            <h2 style={{ color: 'red' }}>
              <span style={{ color: 'azure' }}>Login </span>Here
            </h2>
            <form>
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
              </div>
              {errors.server && <div className="text-danger">{errors.server}</div>}
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <Link to="/createaccount">
                <button type="button" className="btn btn-success" style={{ marginLeft: '15px' }}>
                  Create an Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
