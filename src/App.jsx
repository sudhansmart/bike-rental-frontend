import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/Login';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import Bike from './components/Bike';
import AddBikes from './components/AddBikes';
import ManageBike from './components/ManageBike';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || ''); 
  const [adminloggedin, setAdminloggedin] = useState(localStorage.getItem('adminloggedin') === 'true');
  const [userloggedin, setUserloggedin] = useState(localStorage.getItem('userloggedin') === 'true');

 
  
  useEffect(() => {
    localStorage.setItem('role', role);
    localStorage.setItem('adminloggedin', adminloggedin.toString());
    localStorage.setItem('userloggedin', userloggedin.toString());
  }, [role, adminloggedin,userloggedin]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token && adminloggedin? (
              <Navigate to="/adminpage" />
              ) : token && userloggedin ? (
                <Navigate to="/userpage" />
            ) : (
              <LoginForm setRole={setRole} setToken={setToken} setUserloggedin={setUserloggedin} setAdminloggedin={setAdminloggedin}/>
            )
          }
        />
    
        <Route
          path="/bike"
          element={
            token &&  userloggedin? (
              <Bike />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/about"
          element={
            token &&  userloggedin? (
              <AboutSection/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
         
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route
          path="/userpage"
          element={token &&  userloggedin ? <HomePage userloggedin={userloggedin} token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/adminpage"
          element={token && adminloggedin? <AdminDashboard adminloggedin={adminloggedin}/> : <Navigate to="/" />}
        />
        <Route
          path="/addbike"
          element={token && adminloggedin? <AddBikes /> : <Navigate to="/" />}
        />
        <Route
          path="/managebike"
          element={token && adminloggedin? <ManageBike adminloggedin={adminloggedin} /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
