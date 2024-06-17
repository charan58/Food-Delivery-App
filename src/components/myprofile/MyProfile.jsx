import React from 'react'
import './MyProfile.css'
import FoodItems from '../fooditems/FoodItems'
import { useContext } from 'react';
import { LoginContext } from '../contexts/loginfunctions/LoginContext';
function MyProfile() {
  const [currentUser,error,loginStatus,login,logout] = useContext(LoginContext);
  return (
    <>
      
        <h5 className='name'>Hello {currentUser.username}, we are glad that you are here</h5>
      <FoodItems/>
    </>
  )
}

export default MyProfile
