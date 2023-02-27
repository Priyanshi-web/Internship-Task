import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import Errormessage from "./ErrorMessage"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const schema = Yup.object({
  fullname: Yup.string()
    .required("Fullname is Required")
    .min(3, "Atleast 3 Character Required ")
    .max(20, "Enter A Small Name (< 20)"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  date: Yup.date().nullable().required("Please select a date"),
  phone: Yup.string()
    .required("Please Enter A Number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter 10 Digit Number")
    .max(10, "Please enter 10 Digit Number"),
  password: Yup.string().required("Password is Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is Required"),
  state: Yup.string().required("State is Required"),
  gender: Yup.string().required("Gender is Required"),
  tnc: Yup.bool().oneOf([true], "You need to accept the terms and conditions"),
}).required();

const FormHook = () => {
  const [formData, setFormData] = useState({});
  const [editmode, seteditmode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({
    defaultValues: formData,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onKeyPressHandler = (event) => {
    if (!/^[0-9]/.test(event.key) && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const onsubmit = (data) => {
    console.log(data)
    seteditmode(true)
    setFormData(data)
    reset();
  }

  const handleEdit = () => {
    Object.keys(formData).forEach((keys) => (
      setValue(keys, formData[keys])
    ))
    seteditmode(false)
  }

  return (

    <div className="container py-5">
      <div className="card border-0 shadow w-75 p-3 mx-auto">
        <h1 className="card-header">React Hook Form</h1>
        {editmode ?
          <div>
            <h3>Thanks for Registering!</h3>
            <p>Full Name : {formData.fullname}</p>
            <p>Email Address : {formData.email}</p>
            <p>Phone Number : {formData.phone}</p>
            <p>Date: {formData.date.toString()}</p>
            <p>Password: {formData.password}</p>
            <p>State: {formData.state}</p>
            <p>Gender: {formData.gender}</p>
            <p>Aggreed ? : {formData.tnc.toString()}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
          :
          <form className="card-body" onSubmit={handleSubmit(onsubmit)}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                {...register("fullname")}
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors?.fullname,
                })}
                id="fullname"
                placeholder="Enter Your Full Name"
              />
              {errors?.fullname && (
                <Errormessage errormessage={errors.fullname.message} />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail Address</label>
              <input
                {...register("email")}
                type="email"
                className={classnames("form-control", {
                  "is-invalid": errors?.email,
                })}
                id="email"
                placeholder="Enter Your E-mail Address"
              />
              {errors?.email && (
                <Errormessage errormessage={errors.email.message} />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                {...register("phone")}
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors?.phone,
                })}
                onKeyDown={onKeyPressHandler}
                id="phone"
                placeholder="Enter Your Phone Number"
              />
              {errors?.phone && (
                <Errormessage errormessage={errors.phone.message} />
              )}
            </div>

            <div className="form-group">
              <label>Select a Date</label>
              <input
                {...register("date", {
                  required: true
              })}
                type="date"
                className={classnames("form-control", {
                  "is-invalid": errors?.date,
                })}
                name="date"
              />
              {errors?.date && (
                <Errormessage errormessage={errors.date.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors?.password,
                })}
                id="password"
                placeholder="Enter Your Password"
              />
              {errors?.password && (
                <Errormessage errormessage={errors.password.message} />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                {...register("confirm_password")}
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors?.confirm_password,
                })}
                id="confirm_password"
                placeholder="Enter Your confirm_Password"
              />
              {errors?.confirm_password && (
                <Errormessage errormessage={errors.confirm_password.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">Choose Your State</label>
              <select
                className={classnames("form-control", {
                  "is-invalid": errors?.state,
                })}
                id="state"
                {...register("state")}
              >
                <option value=""> Select a State</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Assam">Assam</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Punjab">Punjab</option>
              </select>
              {errors?.state && (
                <Errormessage errormessage={errors.state.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="mr-4">
                Choose Your Gender
              </label>
              <div className="form-check form-check-inline">
                <input
                  className={classnames("form-check-input", {
                    "is-invalid": errors?.gender,
                  })}
                  {...register("gender", {
                    required: true
                })}
                  type="radio"
                  id="male"
                  value="male"
                />
                <label className="form-check-label" htmlFor="male">
                  male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className={classnames("form-check-input", {
                    "is-invalid": errors?.gender,
                  })}
                  {...register("gender", {
                    required: true
                })}
                  type="radio"
                  id="female"
                  value="female"
                />
                <label className="form-check-label" htmlFor="female">
                  female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className={classnames("form-check-input", {
                    "is-invalid": errors?.gender,
                  })}
                  {...register("gender", {
                    required: true
                })}
                  type="radio"
                  id="other"
                  value="other"
                />
                <label className="form-check-label" htmlFor="other">
                  other
                </label>
              </div>
              {errors?.gender && (
                <div className="form-text text-danger">
                  {errors.gender.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  {...register("tnc")}
                  type="checkbox"
                  id="tnc"
                />
                <label className="form-check-label" htmlFor="tnc">
                  I agree all terms & conditions
                </label>
              </div>
              {errors?.tnc && (
                <div className="form-text text-danger">{errors.tnc.message} </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        }

      </div>

    </div>

  );
};

export default FormHook;