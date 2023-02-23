import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Appendbtn from './Appendbtn';
import './error.css'

const Reactform = () => {

    

    const { register, watch, handleSubmit, reset, control, formState: { errors, isSubmitSuccessful } } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log(data);
        reset({ ...data })
    }

    

    const fullName = watch("fullName");
    const emailId = watch("emailId")
    const phnNum = watch("phnNum");
    const passWord = watch("passWord");
    const select = watch("select");
    const radio = watch("radio");
    const checkbox = watch("checkbox")

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ fullName: '', phnNum: '', passWord: '', conPsw: '', radio: '', checkbox: '', select: '', emailId: '' });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className='container'>
            <h1 className='my-5'>useForm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Full Name</label><br />
                    <input
                        {...register("fullName", { required: true })}
                        placeholder="Full Name"
                        type="text"
                        name='fullName'
                        className={errors.fullName ? "error" : ""}
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
                        className={errors.emailId ? "error" : ""}

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
                        className={errors.phnNum ? "error" : ""}
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
                        className={errors.passWord ? "error" : ""}
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
                        className={errors.conPsw ? "error" : ""}
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
                            className={errors.select ? "error" : ""}
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
                    />
                    <label>Male  </label>


                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        {...register("radio", {
                            required: true
                        })}
                    />
                    <label>Female  </label>


                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        {...register("radio", {
                            required: true
                        })}
                    />
                    <label>Other  </label>
                    {errors.radio && errors.radio.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}
                </div>

                <div>
                    <Controller
                        type="checkbox"
                        name="checkbox"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <input type="checkbox" {...field} />}
                    />
                    <label>I agree all terms & conditions</label>
                    {errors.checkbox && errors.checkbox.type === 'required' && <p style={{ color: "red" }}>This field is required</p>}
                </div>
                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
            <Appendbtn/>
            <div>
                <p>{fullName}</p>
                <p>{emailId}</p>
                <p>{phnNum}</p>
                <p>{passWord}</p>
                <p>{select}</p>
                <p>{radio}</p>
                <p>{checkbox}</p>
            </div>
        </div>
    )
}

export default Reactform