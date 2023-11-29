import React from 'react'
import{Nav} from 'react-bootstrap'

function NavLogin() {

  return (
  <>
        <div className="NavBar">
      <div className='navbar'>
      <Nav  className='Nav-head'
      activeKey="/home"   >
        <div style={{padding:'8px 20px'}}>
        <h3>Glide <span style={{color:'#98ff06'}}>Go</span></h3> 
        </div>
        </Nav>
        </div>
    </div>
    </>
  )
}

export default NavLogin