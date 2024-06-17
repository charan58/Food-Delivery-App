import React, { useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { GrCart } from "react-icons/gr";
import { Dropdown, Badge } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { CartContext } from '../contexts/cartfunctions/CartFunctions';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/loginfunctions/LoginContext';

function NavBar() {
  const [cart, cartCount, addToCart, updateCartItem, removeCartItem] = useContext(CartContext);
  const [currentUser,error,loginStatus,login,logout] = useContext(LoginContext);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/view-cart');
  }
  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }

  return (
    <nav className='navbar navbar-expand-lg'>
      <Link to='/' className='nav-link'>
        <img
          src='https://logowik.com/content/uploads/images/food-service4537.jpg'
          alt='web-logo'
          width="75px"
        />
      </Link>
      <h3 className='navbar-title'>DOOR STEP DELIVERY</h3>
      <div className='navbar-links'>
        {
          !loginStatus && <Link className='nav-link' to='/login'>
          Login
        </Link>
        }
       {
        !loginStatus &&  <Link className='nav-link' to='/sign-up'>
        Signup
      </Link>
       }
        <Link className='nav-link cart' to='/view-cart'>
          Cart
          <div className='cart-count d-flex'>
            
            <Badge className='badge' bg='secondary'>{cartCount}</Badge>
            <GrCart className='cart-icon' />
          </div>
        </Link>
        
        {
          loginStatus && (
            <Dropdown>
          <Dropdown.Toggle variant='secondary' className='profile-icon'>
            <CgProfile className='profile-icon' />
          </Dropdown.Toggle>
          <Dropdown.Menu className='drop-down-items'>
            <Dropdown.Item>
              <Link to='/your-account'>Your Account</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/change-password'>Change Password</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} style={{color:"#fff"}}>Logout</Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
          )
        }
        
      </div>
    </nav>
  );
}

export default NavBar;
