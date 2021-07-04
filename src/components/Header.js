import React from 'react'
import {Link} from 'react-router-dom'

function Header({isLoggedIn, setIsLoggedIn}){
    const removeToken = () =>{
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    return (

    <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Scavenger</a>
    
    <div className="" id="navbarNav">
        
    <ul className="navbar-nav">
    {!isLoggedIn?<Link to='/login' >Login</Link> : <Link onClick={removeToken} >Logout</Link>}
    </ul>
    </div>
    </nav>
    )
}

export default Header;