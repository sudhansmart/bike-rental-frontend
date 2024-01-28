import React from 'react'
import NavBar from './NavBar'
import Slide from './Slide'
import About from './About'





function HomePage({userloggedin}) {
  return (
    <div>
     <NavBar userloggedin={userloggedin}/>
     <Slide/>
     <About/>
   
    
     



    </div>
  )
}

export default HomePage