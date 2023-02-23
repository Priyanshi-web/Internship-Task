import React from 'react'
import { useForm } from 'react-hook-form'


const Append = () => {
    const { register, watch, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log(data);
        reset({ ...data })
    }

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ fullName: '', phnNum: '', passWord: '', conPsw: '', emailId: '' });
        }
    }, [isSubmitSuccessful, reset]);
    
    return (
        <div className='my-5'>
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Append
