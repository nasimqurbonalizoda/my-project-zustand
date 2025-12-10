import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
    const {pathname}=useLocation()
  return (
    <div>
        <div style={{display:"flex",gap:"15px"}}>
        <Link to="/" style={{color:pathname=="/"?"blue":"black"}}>Async</Link>
        <Link to="/createsync" style={{color:pathname=="/createsync"?"blue":"black"}}>Sync</Link>
        </div>
      <Outlet/>
    </div>
  )
}
export default Layout
