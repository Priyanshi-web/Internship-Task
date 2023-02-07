import React, { useState } from "react";

const validateRadioButton = value => {
    if (!value) {
        return 'Please select a radio button';
    }
    return '';
};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Form = () => {
    const [fullName, setFullName] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        add: '',
    });
    const [error, setError] = useState(false);
    const [firsterror, setFirsterror] = useState(false);
    const [lasterror, setLasterror] = useState(false);
    const [eerr, setEerr] = useState(false);
    const [nerr, setNerr] = useState(false);
    const [aerr, setAerr] = useState(false);

    const [isValid, setIsValid] = useState(false);


    // for particular one field 
    // const [touched, setTouched] = useState(false);
    // const [fields, setFields] = useState({
    //     field1: { touched: false },
    //     field2: { touched: false },
    //     field3: { touched: false },
    //     field4: { touched: false },
    //     field5: { touched: false },
    // });

    // const handleBlur = (field) => {
    //     setFields((prevFields) => ({
    //         ...prevFields,
    //         [field]: { touched: true },
    //     }));

    // };

    const handleBlur = (e) => {
        if (fullName.fname.length === 0) {
            setFirsterror(true)
        } else if (fullName.lname.length == 0) {
            setLasterror(true)
        } else if (fullName.email.length == 0) {
            setEerr(true)
        } else if (fullName.phone.length == 0 || fullName.phone.length > 10) {
            setNerr(true)
        } else if (fullName.add.length == 0 ) {
            setAerr(true)
        } else {
            setFirsterror(false)
            setLasterror(false)
            setEerr(false)
            setNerr(false)
            setAerr(false)
        }
        
    }


    const [formData, setformData] = useState({
        isAgree: false,
        gender: ""
    })

    //radio button
    const [selectedValue, setSelectedValue] = useState('');



    const inputEvent = (event) => {
        console.log(event.target.value);
        console.log(event.target.name);

        const { value, name } = event.target;

        const email = event.target.value;
        setIsValid(emailRegex.test(email));


        setFullName((preValue) => {
            console.log(preValue);

            return {
                ...preValue,
                [name]: value,
            };

        });

    };

    const onSubmit = (event) => {
        event.preventDefault();
        //alert("form submitted");
        if (fullName.fname.length == 0 || fullName.lname.length == 0 || fullName.email.length == 0 || fullName.phone.length == 0 || fullName.add.length == 0) {
            setError(true)
        } else {
            setError(false)
        }

        //checkbox
        if (!formData.isAgree) {
            setError(true);
        }

        //radiobutton
        const err = validateRadioButton(selectedValue);
        setError(err);

    };

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.type == "checkbox" ? target.checked : target.value

        setformData({
            ...formData,
            [name]: value
        })

    }

    return (
        <>
            <div className="main my-5">
                <h1 className="text-center my-5">Form (Task 4)</h1>
                <div className="container">
                    <form onSubmit={onSubmit}>
                        <div>
                            <h1>
                                Hello {fullName.fname}{fullName.lname}
                            </h1>
                            <p>{fullName.email}</p>
                            <p>{fullName.phone}</p>
                            <p>{fullName.qua}</p>

                            <div className="text-center my-3">
                                <input type="text"
                                    placeholder="Enter your First name"
                                    name="fname"
                                    onChange={inputEvent}
                                    // onBlur={() => setTouched(true)}
                                    onBlur={handleBlur}
                                    value={fullName.fname}
                                    maxLength={12}
                                    className="col-8"
                                />
                                <br />
                                {firsterror && fullName.fname.length <= 0 ?
                                    <label style={{ color: "red" }}>First Name is required</label> :
                                    error && fullName.fname.length <= 0 ?
                                        <label style={{ color: "red" }}>Please Enter Your First Name</label> : ""
                                }
                            </div>

                            <div className="text-center my-3">
                                <input type="text"
                                    placeholder="Enter your Last name"
                                    name="lname"
                                    onChange={inputEvent}
                                    // onBlur={() => setTouched(true)}
                                    onBlur={handleBlur}
                                    value={fullName.lname}
                                    maxLength={12}
                                    className="col-8"
                                />
                                <br />
                                {   lasterror && fullName.lname.length <= 0 ?
                                    <label style={{ color: "red" }}>Last Name is required</label> :
                                    error && fullName.lname.length <= 0 ?
                                        <label style={{ color: "red" }}>Please Enter Your Last Name</label> : ""}
                            </div>

                            <div className="text-center my-3">
                                <input type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={inputEvent}
                                    // onBlur={() => setTouched(true)}
                                    onBlur={handleBlur}
                                    value={fullName.email}
                                    autoComplete="off"
                                    className="col-8"
                                />
                                <br />
                                {isValid ? (
                                    <p>Valid Email</p>
                                ) : (
                                    <p>Invalid Email</p>
                                )}
                                {   eerr && fullName.email.length <= 0 ?
                                    <label style={{ color: "red" }}>Email is required</label> :
                                    error && fullName.email.length <= 0 ?
                                        <label style={{ color: "red" }}>Please Enter Your Email</label> : ""}

                            </div>

                            <div className="gender text-center mb-3">
                                <label>Male : </label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    checked={formData.gender == "male"} />

                                <label>Female : </label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    checked={formData.gender == "female"} />

                                <p>Gender : {formData.gender}</p>
                                {error &&
                                    <label style={{ color: "red" }}>Please select a radio button</label>}
                            </div>


                            <div className="text-center my-3">
                                <input type="text"
                                    placeholder="Enter your mobile number"
                                    name="phone"
                                    onChange={inputEvent}
                                    // onBlur={() => setTouched(true)}
                                    onBlur={handleBlur}
                                    value={fullName.phone}
                                    // maxLength={10}
                                    className="col-8"
                                />
                                <br />
                                    
                                {   nerr && fullName.phone.length > 10 ?
                                    <label style={{ color: "red" }}>Invalid Mobile Number</label> :
                                    nerr && fullName.phone.length <= 0 ?
                                    <label style={{ color: "red" }}>Mobile Number is required</label> :
                                    error && fullName.phone.length <= 0 ?
                                        <label style={{ color: "red" }}>Please Enter Your Mobile Number</label> : ""}
                            </div>

                            <div className="text-center my-3">  
                                <input type="text"
                                    placeholder="Enter your address"
                                    name="add"
                                    onChange={inputEvent}
                                    // onBlur={() => setTouched(true)}
                                    onBlur={handleBlur}
                                    value={fullName.add}
                                    className="col-8"
                                />
                                <br />
                                {   aerr && fullName.add.length <= 0 ?
                                    <label style={{ color: "red" }}>Address is required</label> :
                                    error && fullName.add.length <= 0 ?
                                        <label style={{ color: "red" }}>Please Enter Your Address</label> : ""}
                            </div>

                            <div className="text-center mb-5">
                                <input
                                    type="checkbox"
                                    name="isAgree"
                                    checked={formData.isAgree}
                                    onChange={handleChange} />
                                <label>Are you agree?</label>
                                <p>is Agree : {formData.isAgree ? "Yes" : "No"}</p>
                                {error &&
                                    <label style={{ color: "red" }}>Please check the checkbox</label>}
                            </div>

                            <div className="text-center">
                                <button type="submit" style={{ color: "white", backgroundColor: "green", border: "none", borderRadius: "10px", padding: "10px" }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Form;