import React from 'react';
import './AddressForm.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
function AddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const handleAddressForm = (addressData) => {
    console.log(addressData);
    navigate('/payment-options');
  };


  return (
    <div className="address-form-container m-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card form-card">
            <div className="card-body">
              <h5 className="card-title text-center">Delivery Address</h5>
              <form onSubmit={handleSubmit(handleAddressForm)}>
                {/* Name */}
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    type="text"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    {...register("address", { required: "*Address is required" })}
                  />
                  {errors.address && <p className="invalid-feedback">{errors.address.message}</p>}
                </div>

                {/* City */}
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    {...register("city", { required: "*City is required" })}
                  />
                  {errors.city && <p className="invalid-feedback">{errors.city.message}</p>}
                </div>

                {/* ZIP */}
                <div className="form-group mb-3">
                  <label htmlFor="zip" className="form-label">ZIP</label>
                  <input
                    id="zip"
                    className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                    type="text"
                    {...register("zip", {
                      required: "*ZIP is required",
                      maxLength: {
                        value: 6,
                        message: "*Invalid ZIP code"
                      },
                      minLength: {
                        value: 5,
                        message: "*Invalid ZIP code"
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "*Invalid ZIP code"
                      }
                    })}
                  />
                  {errors.zip && <p className="invalid-feedback">{errors.zip.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-3 form-group">
                  <label className="form-label" htmlFor="mobilenumber">Phone Number</label>
                  <input
                    type="text"
                    id="mobilenumber"
                    className={`form-control ${errors.mobilenumber ? 'is-invalid' : ''}`}
                    {...register("mobilenumber", {
                      required: "*Phone number is required",
                      maxLength: {
                        value: 10,
                        message: "*Phone number should not exceed 10 digits"
                      },
                      minLength: {
                        value: 10,
                        message: "*Phone number should be at least 10 digits"
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "*Invalid phone number"
                      }
                    })}
                  />
                  {errors.mobilenumber && <p className="invalid-feedback">{errors.mobilenumber.message}</p>}
                </div>

                <button className="btn btn-primary w-100">Confirm Address</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
