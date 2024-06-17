import React, { useState } from 'react';
import './SignUp.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigateToLogin = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // watch the password field
  const watchPassword = watch('password');

  const registerForm = (formDataExcludingConfirmPassword) => {
    // Exclude confirmpassword from form data
    const { confirmpassword, ...formData } = formDataExcludingConfirmPassword;
    console.log(formData);

    axios.post('http://localhost:4000/user-api/register-user', formData)
      .then(response => {
        if (response.status === 201) {
          navigateToLogin('/login');
        } else {
          setError(response.data.message);
        }
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data.message || err.message);
        } else if (err.request) {
          setError('No response from server');
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className='home-container'>
      <div className='card form-card mx-auto'>
        <div className='card-body'>
          <h5 className='card-title text-center'>Sign Up</h5>
          <form onSubmit={handleSubmit(registerForm)}>
            {/* Username */}
            <div className='mb-3'>
              <label className='form-label' htmlFor='username'>Username</label>
              <input 
                type='text' 
                id='username'
                className={`form-control ${errors.username?'is-invalid':''}`}
                {...register("username", { required:"* Username is required" })}
              />
              {errors.username && <p className='invalid-feedback'>{errors.username.message}</p>}
            </div>
            {/* E-mail */}
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>E-mail</label>
                <input
                  type='email'
                  className={`form-control ${errors.email?'is-invalid':''}`}
                  id='email'
                  {...register("email", {
                    required:"* Email is required",
                    pattern:{
                      value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message:"* Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
            </div>
            {/* Password */}
            <div className='mb-3'>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className={`form-control ${errors.password?'is-invalid':''}`}
                {...register("password", {
                  required:"* Password is required",
                  minLength:{
                    value:6,
                    message:"* Password must be at least 6 characters long"
                  }
                })}
              />
              {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
            </div>
            {/* Confirm Password */}
            <div className='mb-3'>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                id='confirmpassword'
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.confirmpassword ? 'is-invalid':''}`}
                {...register("confirmpassword", {
                  required:"* Please retype your password",
                  validate: value => value === watchPassword || "* Passwords do not match"
                })}
              />
              {errors.confirmpassword && <p className='invalid-feedback'>{errors.confirmpassword.message}</p>}
            </div>
            {/* Show Password Checkbox */}
            <div className='mb-3 form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='showpassword'
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showpassword" className='form-check-label'>Show Password</label>
            </div>
            {error && <p className='text-danger'>{error}</p>}
            <button type='submit' className='btn btn-primary w-100'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
