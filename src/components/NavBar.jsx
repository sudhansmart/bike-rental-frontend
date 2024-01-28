import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';

function NavBar  (userloggedin) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isVisible, setIsVisible] = useState(true);
  const [userName, setUserName] = useState(''); 
  const navigate = useNavigate();
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
    navigate('/'); 
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userloggedin');
    
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
        setUserName('');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userloggedin');
        // navigate('/');
      }
    }
  };

  useEffect(() => {
    handleLogin(); 
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
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Services</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/bike">Explore</Nav.Link>
      </Nav.Item>
      <NavDropdown  title="Get Start" id="basic-nav-dropdown" >
            <NavDropdown.Item  href="/bike">Bike List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Events</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Contact</NavDropdown.Item>
              </NavDropdown>
    </Nav>
    {userloggedin ? (
            <NavDropdown title={`Welcome, ${userName}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : ('')}
      </div>
      
      
        
    
    </div>
  );
};

export default NavBar;
