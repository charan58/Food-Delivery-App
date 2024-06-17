import React,{ useState } from 'react';

import './App.css'
import RootLayout from './components/rootlayout/RootLayout';
import Home from './components/home/Home.jsx';
import SignUp from './components/signup/SignUp.jsx';
import Login from './components/login/Login.jsx';
import About from './components/about/About.jsx';
import ForgotPassword from './components/forgotpassword/ForgotPassword.jsx';
import Cart from './components/cart/Cart.jsx';
import MyProfile from './components/myprofile/MyProfile.jsx'
import ChangePassword from './components/changepassword/ChangePassword.jsx';
import AddressForm from './components/address/AddressForm.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ErrorElement from './components/errorelement/ErrorElement.jsx';
import Payment from './components/payment/Payment.jsx';
import MyAccount from './components/myaccount/MyAccount.jsx';
import ResetPassword from './components/resetpassword/ResetPassword.jsx';
function App() {
  // Food Items
  const foodItems = [
    {
      id: 1,
      name: 'Butter Chicken',
      image: 'path_to_butter_chicken_image',
      rating: 4.8,
      price: 350,
      deliveryTime: '40 mins',
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      image: 'path_to_paneer_tikka_image',
      rating: 4.6,
      price: 300,
      deliveryTime: '35 mins',
    },
    {
      id: 3,
      name: 'Biryani',
      image: 'path_to_biryani_image',
      rating: 4.7,
      price: 250,
      deliveryTime: '45 mins',
    },
    {
      id: 4,
      name: 'Masala Dosa',
      image: 'path_to_masala_dosa_image',
      rating: 4.5,
      price: 150,
      deliveryTime: '30 mins',
    },
    {
      id: 5,
      name: 'Chole Bhature',
      image: 'path_to_chole_bhature_image',
      rating: 4.6,
      price: 200,
      deliveryTime: '25 mins',
    },
    {
      id: 6,
      name: 'Palak Paneer',
      image: 'path_to_palak_paneer_image',
      rating: 4.7,
      price: 280,
      deliveryTime: '35 mins',
    },
    {
      id: 7,
      name: 'Tandoori Chicken',
      image: 'path_to_tandoori_chicken_image',
      rating: 4.8,
      price: 320,
      deliveryTime: '50 mins',
    },
    {
      id: 8,
      name: 'Samosa',
      image: 'path_to_samosa_image',
      rating: 4.3,
      price: 50,
      deliveryTime: '15 mins',
    },
    {
      id: 9,
      name: 'Pav Bhaji',
      image: 'path_to_pav_bhaji_image',
      rating: 4.6,
      price: 180,
      deliveryTime: '25 mins',
    },
    {
      id: 10,
      name: 'Dal Makhani',
      image: 'path_to_dal_makhani_image',
      rating: 4.7,
      price: 240,
      deliveryTime: '30 mins',
    },
    {
      id: 11,
      name: 'Gulab Jamun',
      image: 'path_to_gulab_jamun_image',
      rating: 4.8,
      price: 100,
      deliveryTime: '20 mins',
    },
    {
      id: 12,
      name: 'Rogan Josh',
      image: 'path_to_rogan_josh_image',
      rating: 4.7,
      price: 350,
      deliveryTime: '45 mins',
    },
    {
      id: 13,
      name: 'Aloo Paratha',
      image: 'path_to_aloo_paratha_image',
      rating: 4.5,
      price: 120,
      deliveryTime: '20 mins',
    },
    {
      id: 14,
      name: 'Chicken Curry',
      image: 'path_to_chicken_curry_image',
      rating: 4.6,
      price: 300,
      deliveryTime: '40 mins',
    },
    {
      id: 15,
      name: 'Vada Pav',
      image: 'path_to_vada_pav_image',
      rating: 4.3,
      price: 60,
      deliveryTime: '15 mins',
    },
    {
      id: 16,
      name: 'Paneer Butter Masala',
      image: 'path_to_paneer_butter_masala_image',
      rating: 4.7,
      price: 280,
      deliveryTime: '35 mins',
    },
    {
      id: 17,
      name: 'Fish Curry',
      image: 'path_to_fish_curry_image',
      rating: 4.7,
      price: 350,
      deliveryTime: '40 mins',
    },
    {
      id: 18,
      name: 'Rajma Chawal',
      image: 'path_to_rajma_chawal_image',
      rating: 4.6,
      price: 200,
      deliveryTime: '30 mins',
    },
    {
      id: 19,
      name: 'Idli Sambhar',
      image: 'path_to_idli_sambhar_image',
      rating: 4.5,
      price: 100,
      deliveryTime: '20 mins',
    },
    {
      id: 20,
      name: 'Kebabs',
      image: 'path_to_kebabs_image',
      rating: 4.8,
      price: 320,
      deliveryTime: '35 mins',
    },
];

  const routerObject=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout />,
      errorElement:<ErrorElement/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/sign-up',
          element:<SignUp/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/reset-password',
          element:<ForgotPassword/>
        },
        {
          path:'/view-cart',
          element:<Cart />
        },
        {
          path:'/your-profile',
          element:<MyProfile/>
        },
        {
          path:'/change-password',
          element:<ChangePassword/>
        },
        {
          path:'/checkout-order',
          element:<AddressForm/>
        },
        {
          path:'/payment-options',
          element:<Payment/>
        },
        {
          path:'/your-account',
          element:<MyAccount/>
        },
        {
          path:'/password-reset',
          element:<ResetPassword/>
        }
      ]
    }
  ]);
  return (
    <>
    {/* pass the router object */}
       <RouterProvider router={routerObject}/>
    </>
  )
}

export default App
