import React from 'react'
import NavBar from '../navbar/NavBar';
import { Outlet } from 'react-router-dom';
import CartFunctionsStore from '../contexts/cartfunctions/CartFunctionsStore';
function RootLayout() {
  return (
    <CartFunctionsStore>
      <NavBar/>
      {/* placeholder */}
      <Outlet/>
    </CartFunctionsStore>
  )
}

export default RootLayout
