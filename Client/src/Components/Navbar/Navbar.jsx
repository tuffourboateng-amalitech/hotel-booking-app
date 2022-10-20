import './Navbar.css';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const{user} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className="navContainer">
            <Link to="/" className='link'>
            <span className="logo">hotelLogo</span>
            </Link>
            {user ? user.username : (
                <div className="navItems">
                <button className="navbutton">Register</button>
                <button className="navbutton">Login</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Navbar 