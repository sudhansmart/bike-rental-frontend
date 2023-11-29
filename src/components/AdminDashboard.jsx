import React from 'react'
import AdminNavBar from './AdminNavBar'


function AdminDashboard({adminloggedin}) {
  return (
    <div>
      <AdminNavBar adminloggedin={adminloggedin}/>
      </div>
  )
}

export default AdminDashboard