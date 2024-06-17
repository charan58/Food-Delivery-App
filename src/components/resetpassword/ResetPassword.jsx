import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch
    } = useForm();
    const [showPassword,setShowPassword]=useState(false);

    const watchNewPassword=watch('newpassword');

    const handlePasswordResetForm=(obj)=>{
        console.log("form obj",obj)
    }
  return (
    <div className='home-container'>
    <div className='card form-card mx-auto'>
      <div className='card-body'>
        <h5 className="card-title text-center">Reset your password</h5>
        <form onSubmit={handleSubmit(handlePasswordResetForm)}>

          
          <div className='mb-3'>
            <label htmlFor="password">New Password</label>
            <input
              type={showPassword ? 'text':'password'}
              id='newpassword'
              className={`form-control ${errors.password?'is-invalid':''}`}

              {
                ...register(
                  "newpassword",
                  {
                    required:"*newpassword is required",
                    minLength:{
                      value:6,
                      message:"*newpassword must be at least 5 characters long"
                    }
                  }
                )
              }
            />
            {errors.newpassword && <p className='invalid-feedback'>{errors.newpassword.message}</p>}

          </div>
          {/* Confirm Password */}
          <div className='mb-3'>
            <label htmlFor="confirmpassword">Confirm New Password</label>
            <input
              id='confirmpassword'
              type={showPassword ? 'text': 'password'}
              className={`form-control ${errors.confirmpassword ? 'is-invalid':''}`}
              {
                ...register(
                  "confirmpassword",
                  {
                    required:"*please retype your password",
                    validate: value =>
                      value === watchNewPassword || '*passwords do not match'
                  }
                )
              }
            />
            {errors.confirmpassword && <p className='invalid-feedback'>{errors.confirmpassword.message}</p>}
          </div>


          <div className='mb-3 form-check'>

              <input
                type='checkbox'
                className='form-check-input'
                id='showpassword'
                onChange={()=>setShowPassword(!showPassword )}
              />
              <label htmlFor="showpassword" className='form-check-label'>Show Password</label>

            </div>


          <button type="submit" className="btn btn-primary mb-3 w-100">Reset Password</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword
