import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

function AdminNavBar  ({adminloggedin}) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isVisible, setIsVisible] = useState(true);
  const [userName, setUserName] = useState(''); // Add state for user name
 

  console.log(adminloggedin)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('token'); 
    localStorage.removeItem('role'); 
    localStorage.removeItem('adminloggedin'); 
    
  };
  const handleLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('https://goglide.onrender.com/login/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.username);
       
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('token');
        localStorage.removeItem('role'); 
        localStorage.removeItem('adminloggedin'); 
        navigate('/');
      }
    }
  };

  useEffect(() => {
    handleLogin(); // Check login status on component mount
  }, []);

  return (
    <div className="NavBar">
      <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <Nav  className='Nav-head'
      activeKey="/home"   >
        <div style={{padding:'8px 20px'}}>
        <h3>Glide <span style={{color:'#98ff06'}}>Go</span></h3> 
        </div>
     
      <Nav.Item>
        <Nav.Link href="/adminpage">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/addbike">Add Bikes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Bookings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Vehicle Staus</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/managebike">Manage Bike List</Nav.Link>
      </Nav.Item>
     
    </Nav>
    {adminloggedin ? (
            <NavDropdown title={`Welcome, ${userName}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : ('')}
      </div>
      
      
        
    
    </div>
  );
};

export default AdminNavBar;
