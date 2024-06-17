import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register: registerOtp, handleSubmit: handleOtpForm, formState: { errors: errorsOtp }, reset: resetOtpForm } = useForm();
  
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState("");
  const [otpState,setOtpState]=useState("");
  const navigateToChangePassword = useNavigate();

  const handleVerifyOtp = (typedOtp) => {
    const storedOtp = localStorage.getItem("otp").toString();
    // console.log("stored otp ",storedOtp);
    // console.log("typed otp ",typedOtp);
    if (storedOtp === typedOtp.otp) {
      setOtpState("OTP matched successfully");
      navigateToChangePassword('/password-reset');
      localStorage.removeItem("otp");
    } else {
      setOtpState("OTP mismatched, try again");
    }
    
    
  };

  const submitResetPasswordForm = (resetPassObj) => {
    axios.post('http://localhost:4000/otp-route/check-mail', resetPassObj)
      .then(response => {
        if (response.status === 200) {
          const otp = response.data.payload;
          localStorage.setItem("otp", otp);
          setShowOtpField(response.data.otpform);
          setError("");
        } else {
          setShowOtpField(false);
          setError(response.data.message);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const submitOtpForm = (otpObj) => {
    handleVerifyOtp(otpObj);
    // console.log("otp from client ",otpObj);
  };

  return (
    <div className='home-container'>
      <div className='card form-card mx-auto'>
        <div className='card-body'>
          <h5 className="card-title text-center">Reset your password</h5>
          {error && <p className='text-danger'>{error}</p>}
          {otpState.length!=0 && (<p className='text-info'>{otpState}</p>)}
          <form onSubmit={handleSubmit(submitResetPasswordForm)}>
            <div className='mb-3'>
              <label className='form-label' htmlFor='email'>E-mail</label>
              <input
                type='email'
                id='email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register("email", {
                  required: "*email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "*invalid mail address"
                  }
                })}
              />
            </div>
            {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
            <button type="submit" className="btn btn-primary mb-3 w-100">Send OTP</button>
          </form>
          
          {showOtpField &&
            <>
              <form onSubmit={handleOtpForm(submitOtpForm)}>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='otp'>Enter the OTP</label>
                  <input
                    type='text'
                    className={`form-control ${errorsOtp.otp ? 'is-invalid' : ''}`}
                    id='otp'
                    {...registerOtp("otp", {
                      maxLength: {
                        value: 6,
                        message: "*otp should not exceed 6 digits"
                      }
                    })}
                  />
                </div>
                {errorsOtp.otp && <p className='invalid-feedback'>{errorsOtp.otp.message}</p>}
                <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
              </form>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
