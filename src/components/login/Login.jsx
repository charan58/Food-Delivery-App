import React ,{useContext, useEffect}from 'react'
import './Login.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/loginfunctions/LoginContext';
import { useNavigate } from 'react-router-dom';
function Login() {

  const [currentUser,error,loginStatus,login,logout]=useContext(LoginContext);
  const {register, handleSubmit, formState:{ errors }, watch} = useForm();

  const [showLoginPassword,setshowLoginPassword] = useState(false);

  const navigateToProfile = useNavigate();
  const loginForm=(loginFormObj)=>{
    
    login(loginFormObj);
    // console.log("Login form object ",loginFormObj);
  }

  const showPassword = watch('password');

  useEffect(()=>{
    if(loginStatus===true)
    {
      navigateToProfile('/your-profile');
    }
  },[loginStatus]);


  return (
    <div className='home'>
      <div className='card form-card mx-auto'>
        <div className='card-body'>
          <h5 className='card-title text-center'>Sign In</h5>
          {error.length!==0 && (<p className='text-danger'>{error}</p>)}
            <form onSubmit={handleSubmit(loginForm)}>
              {/* Username */}
              <div className='mb-3'>
                <label htmlFor="username" className='form-label'>Username</label>
                <input
                  type='text'
                  id='username'
                  className={`form-control ${errors.username ? 'is-invalid':''}`}
                  {
                    ...register(
                      "username",
                      {
                        required:"*username is required"
                      }
                    )
                  }
                />
                {errors.username && <p className='invalid-feedback'>{errors.username.message}</p>}

              </div>

              {/* Password  */}
              <div className='mb-3'>
                <label className='form-label' htmlFor='password'>Password</label>
                <input
                  type={showLoginPassword?'text':'password'}
                  id='password'
                  className='form-control'
                  {...register(
                    "password",
                    {
                      required:"*password is required"
                    }
                  )}
                />
                {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
              </div>

              {/* Show Password check box */}
              <div className='form-check mb-3'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='showpassword'

                    onChange={()=>setshowLoginPassword(!showLoginPassword)}
                  />
                  <label htmlFor="showpassword">Show Password</label>
              </div>

              {/* Button */}
              <button className='btn btn-primary w-100 mb-3' type='submit'>Sign In</button>
            </form>
              <h6 className='card-title'>Forgot Password.? <span><Link to='/reset-password' className='redirect-reset-password'>reset it </Link></span></h6>
              <h6 className='card-title'>Don't have an account, click <span><Link to='/sign-up' className='redirect-signup'>here </Link></span>to join us</h6>
        </div>

      </div>
    </div>
  )
}

export default Login
