import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Appendbtn from './Appendbtn';
import './error.css'
import classnames from "classnames";

const Reactform = () => {

    const [formData, setFormData] = useState({});
    const [editmode, seteditmode] = useState(false);


    const {
        register,
        watch,
        setValue,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: "all"
    });

    const onSubmit = (data) => {
        console.log(data)
        seteditmode(true)
        setFormData(data)
        reset()
    }

    // const fullName = watch("fullName");
    // const emailId = watch("emailId")
    // const phnNum = watch("phnNum");
    // const passWord = watch("passWord");
    // const select = watch("select");
    // const radio = watch("radio");
    // const checkbox = watch("checkbox")

    // React.useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset({ fullName: '', phnNum: '', passWord: '', conPsw: '', radio: '', checkbox: '', select: '', emailId: '' });
    //     }
    // }, [isSubmitSuccessful, reset]);

    const handleEdit = () => {
        Object.keys(formData).forEach((keys) => (
            setValue(keys, formData[keys])
        ))
        seteditmode(false)
    }

    return (
        <div className='container'>
            <h1 className='my-5'>useForm</h1>
            {editmode ?
                <div>
                    <h3>Thanks for Registering!</h3>
                    <p>Full Name : {formData.fullName}</p>
                    <p>Email Address : {formData.emailId}</p>
                    <p>Phone Number : {formData.phnNum}</p>
                    <p>Date: {formData.date.toString()}</p>
                    <p>Password: {formData.passWord}</p>
                    <p>State: {formData.select}</p>
                    <p>Gender: {formData.radio}</p>
                    <p>Aggreed ? : {formData.checkbox.toString()}</p>
                    <button className='btn btn-success' onClick={handleEdit}>Edit</button>
                </div>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Full Name</label><br />
                        <input
                            {...register("fullName", { required: true })}
                            placeholder="Full Name"
                            type="text"
                            name='fullName'
                            className={classnames("form-control", {
                                "is-invalid": errors?.fullName,
                            })}
                        />
                        {errors.fullName && errors.fullName.type === 'required' && <p style={{ color: "red" }}>Please enter the Password</p>}
                    </div>
                    <div>
                        <label>E-mail Address</label><br />
                        <input
                            {...register("emailId", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
                            placeholder="E-mail Address"
                            type="text"
                            name='emailId'
                            className={classnames("form-control", {
                                "is-invalid": errors?.emailId,
                            })}

                        />
                        {errors.emailId && errors.emailId.type === 'pattern' && <p style={{ color: "red" }}>Invalid email Id</p>}
                        {errors.emailId && errors.emailId.type === 'required' && <p style={{ color: "red" }}>Please Enter your email</p>}
                    </div>
                    <div>
                        <label>Phone Number</label><br />
                        <input
                            {...register("phnNum", { required: true, pattern: /^(?:(?:\+|0{0,2})91(\s*[\    -]\s*)?|[0]?)?[789]\d{9}$/ })}
                            placeholder="Phone Number"
                            type="text"
                            name='phnNum'
                            maxLength={10}
                            className={classnames("form-control", {
                                "is-invalid": errors?.phnNum,
                            })}
                        />
                        {/* <p style={{ color: "red" }}>{phnNum.length > 10 ? "Max length is  10" : ""}</p> */}
                        {errors.phnNum && errors.phnNum.type === 'pattern' && <p style={{ color: "red" }}>Invalid mobile number</p>}
                        {errors.phnNum && errors.phnNum.type === 'required' && <p style={{ color: "red" }}>Please Enter the mobile number</p>}
                    </div>
                    <div>
                        <label>Password</label><br />
                        <input
                            {...register("passWord", { required: true })}
                            placeholder="Password"
                            type="password"
                            name='passWord'
                            className={classnames("form-control", {
                                "is-invalid": errors?.password,
                            })}
                        />
                        {errors.passWord && errors.passWord.type === 'required' && <p style={{ color: "red" }}>Please enter the Password</p>}

                    </div>
                    <div>
                        <label>Confirm Password</label><br />
                        <input
                            {...register("conPsw", { required: true, validate: value => value === watch("passWord") })}
                            placeholder="Confirm Password"
                            type="password"
                            name='conPsw'
                            className={classnames("form-control", {
                                "is-invalid": errors?.conPsw,
                            })}
                        />
                        {errors.conPsw && errors.conPsw.type === 'required' && <p style={{ color: "red" }}>Please enter the confirm Password</p>}
                        {errors.conPsw && errors.conPsw.type === 'validate' && <p style={{ color: "red" }}>Please Enter Same Password</p>}
                    </div>
                    <div>
                        <label>Choose your state</label><br />
                        <Controller
                            type="select"
                            name="select"
                            control={control}
                            render={({ field }) => <select
                                {...field}{...register("select", { required: true })}
                                className={classnames("form-control", {
                                    "is-invalid": errors?.select,
                                })}
                            >
                                <option value="">---Select Your State---</option>
                                <option value="Gujrat">Gujrat</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Rajsthan">Rajsthan</option>
                            </select>}
                        />
                        {errors.select && errors.select.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}                </div>

                    <div>
                        <label>Choose your gender</label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            {...register("radio", {
                                required: true
                            })}
                            className={classnames("form-check-input", {
                                "is-invalid": errors?.radio,
                            })}
                        />
                        <label>Male  </label>

                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            {...register("radio", {
                                required: true
                            })}
                            className={classnames("form-check-input", {
                                "is-invalid": errors?.radio,
                            })}
                        />
                        <label>Female  </label>

                        <input
                            type="radio"
                            name="other"
                            value="female"
                            {...register("radio", {
                                required: true
                            })}
                            className={classnames("form-check-input", {
                                "is-invalid": errors?.radio,
                            })}
                        />
                        <label>Other  </label>
                        {errors.radio && errors.radio.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}
                    </div>

                    <div>
                        <input
                            type="date"
                            className={classnames("form-control", {
                                "is-invalid": errors?.date,
                            })}
                            name='date'
                            {...register("date", { required: true })} />
                        {errors.date && errors.date.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}

                    </div>

                    <div>
                        <Controller
                            type="checkbox"
                            name="checkbox"
                            control={control}
                            rules={{ required: true }}
                            className={classnames("form-control", {
                                "is-invalid": errors?.checkbox,
                            })}
                            render={({ field }) => <input type="checkbox" {...field} />}
                        />
                        <label>I agree all terms & conditions</label>
                        {errors.checkbox && errors.checkbox.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}
                    </div>
                    <Appendbtn />

                    <button className='btn btn-success' type='submit'>Submit</button>


                </form>
            }
            {/* <div>
                <p>{fullName}</p>
                <p>{emailId}</p>
                <p>{phnNum}</p>
                <p>{passWord}</p>
                <p>{select}</p>
                <p>{radio}</p>
                <p>{checkbox}</p>
            </div> */}
        </div>
    )
}

export default Reactform