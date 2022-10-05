import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navContainer">
            <span className='logo'>logoHotel</span>
            <div className="navItems">
                <button className="navbutton">Register</button>
                <button className="navbutton">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar