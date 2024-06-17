import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal } from 'bootstrap';

function ChangePassword() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false); // State to control success modal

  const watchPassword = watch('newpassword');

  const handleChangePasswordForm = async (formData) => {
    try {
      // Fetch JWT token from localStorage (replace with your token retrieval method)
      const token = localStorage.getItem("token"); // Assuming accessToken is stored in localStorage

      // Send POST request to backend
      const response = await axios.post('http://localhost:4000/pass-reset/password-change', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        console.log(response.data.message);
        setSuccessModal(true); // Show success modal on successful password change
        reset(); // Reset form fields
      } else {
        setError(response.data.message); // Handle error response from server
      }
    } catch (err) {
      setError(err.message); // Handle network errors
    }
  };

  return (
    <div className='home-container'>
      <div className='card form-card mx-auto'>
        <div className='card-body'>
          <h5 className="card-title text-center">Reset your password</h5>
          <form onSubmit={handleSubmit(handleChangePasswordForm)}>
            <div className='mb-3'>
              <label className='form-label' htmlFor='password'>Current Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register(
                  "password", 
                  {
                  required: "* Password is required",
                  }
              )}
              />
              {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="newpassword">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='newpassword'
                className={`form-control ${errors.newpassword ? 'is-invalid' : ''}`}
                {...register("newpassword", {
                  required: "* New Password is required",
                  minLength: {
                    value: 6,
                    message: "* New Password must be at least 6 characters long"
                  }
                })}
              />
              {errors.newpassword && <p className='invalid-feedback'>{errors.newpassword.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className='mb-3'>
              <label htmlFor="confirmpassword">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='confirmpassword'
                className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
                {...register("confirmpassword", {
                  required: "* Please retype your password",
                  validate: value =>
                    value === watchPassword || "* Passwords do not match"
                })}
              />
              {errors.confirmpassword && <p className='invalid-feedback'>{errors.confirmpassword.message}</p>}
            </div>

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

            <button type="submit" className="btn btn-primary mb-3 w-100">Change Password</button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <div className="modal" tabIndex="-1" style={{ display: successModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Password Updated</h5>
              <button type="button" className="btn-close" onClick={() => setSuccessModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Your password has been updated successfully!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setSuccessModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
