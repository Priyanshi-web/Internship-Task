import React,{ useState } from 'react';

const validateRadioButton = value => {
  if (!value) {
    return 'Please select a radio button';
  }
  return '';
};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


const EditData = () => {

  //to add the data
  const [userRegistration, setUserRegistration] = useState({
    fname: 'abc',
    lname: 'xyz',
    email: 'abc@gmail.com',
    phone: '786634981245',
    add: 'mno',
  });

  //to store the data
  const [records, setRecords] = useState([]);

  //for toggle through form and data
  const [isedit, setIsedit] = useState(false)

  //to set the error at the time of form submission
  const [error, setError] = useState(false);

  //to edit the data
  const [isEditItem, setIsEditItem] = useState(null);

  //const [toggleSubmit, setToggleSubmit] = useState(true);

  //for checkbox and radio button
  const [formData, setformData] = useState({
    isAgree: false,
    gender: "male"
  })

  //radio button
  const [selectedValue, setSelectedValue] = useState('');

  //to check email was valid or not
  const [isValid, setIsValid] = useState(false);

  //for particular input field
  const [fnerr, setFnerr] = useState(false);
  const [lnerr, setLnerr] = useState(false);
  const [eerr, setEerr] = useState(false);
  const [nerr, setNerr] = useState(false);
  const [aerr, setAerr] = useState(false);

  const handleBlur = (e) => {
    if (userRegistration.fname.length === 0) {
      setFnerr(true)
    } else if (userRegistration.lname.length == 0) {
      setLnerr(true)
    } else if (userRegistration.email.length == 0) {
      setEerr(true)
    } else if (userRegistration.phone.length == 0 || userRegistration.phone.length > 10) {
      setNerr(true)
    } else if (userRegistration.add.length == 0) {
      setAerr(true)
    } else {
      setFnerr(false)
      setLnerr(false)
      setEerr(false)
      setNerr(false)
      setAerr(false)
    }

  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setUserRegistration({ ...userRegistration, [name]: value });

    //email validation using regex
    const email = e.target.value;
    setIsValid(emailRegex.test(email));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (userRegistration) {
      setRecords(
        records.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: userRegistration }
          }
          return elem;
        })
      )
      //setToggleSubmit(true);

      setUserRegistration('');

      //setIsEditItem(null);
    } else {
      const setUserRegistration = { id: new Date().getTime().toString(), name: userRegistration }
      setRecords([...records, setUserRegistration]);
      setUserRegistration('')
    }

    //Check the condition if string length is 0 than change setError state true or false
    if (userRegistration.fname.length == 0 || userRegistration.lname.length == 0 || userRegistration.email.length == 0 || userRegistration.phone.length == 0 || userRegistration.add.length == 0) {
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

    setUserRegistration({ fname: "", lname: "", email: "", phone: "", add: "" });
    //setUserRegistration();

  }

  function onedit() {
    if (isedit == false) {
      setIsedit(true);
    }
    else {
      setIsedit(false)
    }
  }

  //for the checkbox
  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.type == "checkbox" ? target.checked : target.value

    setformData({
      ...formData,
      [name]: value
    })

  }

  // const editItem = (id) => {
  //   let newEditItem = records.find((elem) => {
  //     return elem.id === id
  //   });
  //   console.log(newEditItem);

  //   setToggleSubmit(false);

  //   setUserRegistration(newEditItem.name);

  //   setIsEditItem(id);

  // }



  //   const editItem = (id) => {
  //     let newEditItem = records.find((elem) => {
  //         return elem.id === id
  //     });
  //     console.log(newEditItem);



  //     setUserRegistration(newEditItem.name);

  //     setIsEditItem(id);

  // }


  return (
    <>
      {isedit ?

        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <button type="submit" className='mt-5' style={{ color: "white", backgroundColor: "green", border: "none", borderRadius: "10px", padding: "10px" }} onClick={onedit}>Update</button>
          </div>

          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Enter your First name"
              autoComplete='off'
              value={userRegistration.fname}
              onChange={handleInput}
              //for handling the error for only this field
              onBlur={handleBlur}
              maxLength={12}
              className="col-8"
              name='fname'
              id="fname"
            />
            <br />
            {
              fnerr && userRegistration.fname.length <= 0 ?
                <label style={{ color: "red" }}>First Name is required</label> :
                error && userRegistration.fname.length <= 0 ?
                  <label style={{ color: "red" }}>Please Enter Your First Name</label> : ""
            }
          </div>

          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Enter your Last name"
              autoComplete='off'
              value={userRegistration.lname}
              onChange={handleInput}
              //for handling the error for only this field
              onBlur={handleBlur}
              maxLength={12}
              className="col-8"
              name='lname'
              id="lname"
            />
            <br />
            {
              lnerr && userRegistration.lname.length <= 0 ?
                <label style={{ color: "red" }}>Last Name is required</label> :
                error && userRegistration.lname.length <= 0 ?
                  <label style={{ color: "red" }}>Please Enter Your Last Name</label> : ""
            }
          </div>

          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Enter your email"
              autoComplete='off'
              value={userRegistration.email}
              onChange={handleInput}
              //for handling the error for only this field
              onBlur={handleBlur}
              className="col-8"
              name='email'
              id="email"
            />
            <br />
            {isValid ? (
              <p>Valid Email</p>
            ) : (
              <p>Invalid Email</p>
            )}
            {
              eerr && userRegistration.email.length <= 0 ?
                <label style={{ color: "red" }}>Email is required</label> :
                error && userRegistration.email.length <= 0 ?
                  <label style={{ color: "red" }}>Please Enter Your Email</label> : ""
            }
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
            <input
              type="text"
              placeholder="Enter your mobile number"
              autoComplete='off'
              value={userRegistration.phone}
              onChange={handleInput}
              //for handling the error for only this field
              onBlur={handleBlur}
              maxLength={10}
              className="col-8"
              name='phone'
              id="phone"
            />
            <br />
            {
              nerr && userRegistration.phone.length <= 0 ?
                <label style={{ color: "red" }}>Phone Number is required</label> :
                error && userRegistration.phone.length <= 0 ?
                  <label style={{ color: "red" }}>Please Enter Your Phone Number</label> : ""
            }
          </div>

          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Enter your address"
              autoComplete='off'
              value={userRegistration.add}
              onChange={handleInput}
              //for handling the error for only this field
              onBlur={handleBlur}
              className="col-8"
              name='add'
              id="add"
            />
            <br />
            {
              aerr && userRegistration.add.length <= 0 ?
                <label style={{ color: "red" }}>Address is required</label> :
                error && userRegistration.add.length <= 0 ?
                  <label style={{ color: "red" }}>Please Enter Your Address</label> : ""
            }
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
            <button type='submit' style={{ color: "white", backgroundColor: "green", border: "none", borderRadius: "10px", padding: "10px" }} onClick={onedit}>submit</button>
          </div>
        </form>

        :

        <div>
          <div className="text-center mt-5">
            <button style={{ color: "white", backgroundColor: "green", border: "none", borderRadius: "10px", padding: "10px" }} onClick={onedit}>Edit</button>
          </div>
          <div className="text-center my-5">
            <p>First Name:{userRegistration.fname}</p>
            <p>Last Name:{userRegistration.lname}</p>
            <p>Email:{userRegistration.email}</p>
            <p>Gender : {formData.gender}</p>
            <p>Phone:{userRegistration.phone}</p>
            <p>Address:{userRegistration.add}</p>
            <p>Check box is checked: {formData.isAgree ? "Yes" : "No"}</p>
          </div>
        </div>
      }

    </>
  );
};

export default EditData;