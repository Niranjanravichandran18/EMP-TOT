import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./css/Style.css";
// import Login from "./Login";
// import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import "./css/Signup_module.css"

const AdminCandidateUpdate = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({});
  let username=  localStorage.getItem("username")
  const [isSubmitted, setIsSubmitted] = useState(false);
  const goBack = () => {
    window.history.back();
  };
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value ,["username"]:username});
  }

  function handleSubmit(event) {
    event.preventDefault();
    

    axios.post("http://localhost:3001/admin_empupdate", formData)
      .then((response) => {
        console.log(response);
        if (response.data ===true) {
          navigate("/Dashboard");
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleClickSubmit = (event) => {
    setIsSubmitted(true);
    alert('Your form is submitted');
  };

  return (
    <section id="test1">
      <div className="container">
        <section> 
          <h2
            className="text-center signup_heading"
            style={{ color: "#fff"}}
          >
            Update your Account{" "}
          </h2>
        </section>
        <button onClick={goBack} className="back">
      <span>&#8592;</span> {/* Unicode character for left arrow */}
    </button>     
        <form className="signup_form update_forms row" onSubmit={handleSubmit}>
          <div className="col-6">
            {/* <div className="row demo1">
              <label
                htmlFor="firstname"
                className="col-5 text-center signup-input"
              >
                First Name
              </label>
              <input
                className="col-7 demo"
                type="text"
                name="firstname"
                pattern="[A-Za-z]+"
                id="firstname"
                placeholder="What is your First Name?"
                style={{ width: "200px" }}
                onChange={handleInputChange}
                required
              />
            </div> */}
            {/* <div className="row demo1">
              <label
                htmlFor="lastname"
                className="col-5 text-center signup-input"
              >
                Last Name
              </label>
              <input
                className="col-7 demo"
                type="text"
                name="lastname"
                pattern="[a-zA-Z]+"
                id="lastname"
                placeholder="What is your last Name?"
                style={{ width: "200px" }}
                onChange={handleInputChange}
                required
              />
            </div> */}
            {/* <div className="row demo1">
              <label
                htmlFor="email_id"
                className="col-5 text-center signup-input"
              >
                Email Id
              </label>
              <input
                type="e-mail"
                className="col-7 demo"
                name="email_id"
                id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Tell us Your Email ID"
                onChange={handleInputChange}
              />
            </div> */}
            {/* <div className="row demo1">
              <label
                htmlFor="password"
                className="col-5 text-center signup-input"
                required
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="col-7 demo"
                aria-hidden="true"
               pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g"
                placeholder="Create your Password"
                style={{ width: "200px" }}
                onChange={handleInputChange}
                required
              />
            </div> */}
            {/* <div className="row demo1">
              <label
                htmlFor="confirm_password"
                className="col-5 text-center signup-input"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm-password"
                className="col-7 demo"
                aria-hidden="true"
                // pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g"
                placeholder="Confirm your Password"
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div className="row demo1">
              <label
                htmlFor="designation"
                className="col-5 text-center signup-input"
              >
                Designation
              </label>
              <select
                name="designation"
                id="designation"
                className="col-7 demo"
                onChange={handleInputChange}
              >
                <option value="Select">--Select--</option>
                <option value="software developer">Software Developer</option>
                <option value="Software Tester">Software Tester</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Python Developer">Python Developer</option>
                <option value="Automation Tester">Automation Tester</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Team Leader">Team Leader</option>
                <option value="HR">HR</option>
                <option value="Junior Software Developer">
                  {" "}
                  Junior Software Developer
                </option>
                <option value="Assistant Manager">Assistant Manager</option>
              </select>
            </div>
            <div className="row demo1">
              <label
                htmlFor="education"
                className="col-5 text-center signup-input"
              >
               Post Graduation
              </label>
              {/* <input */}
              <select
                type="text"
                className="col-7 demo"
                name="post_graduation"
                onChange={handleInputChange}
                placeholder="Post Graduation"
                id="post_graduation"
              >
              <option value="Select">Select</option>
                    <option value="MSc computer science ">MSc computer science </option>
                    <option value="MSc Biology">MSc Biology </option>
                    <option value="MSc Physics">MSc Physics </option>
                    <option value="MSc Chemistry">MSc Chemistry </option>
                    <option value="MSc Biotech">MSc Biotech </option>
                    <option value="MSc Mech">MSc Mech </option>
                    <option value="MSc elec">MSc elec </option>
                    <option value="MCA">MCA </option>
                    <option value="Mcom ">Mcom </option>
                    <option value="MA">MA </option>
                    <option value="MBA">MBA </option>
                    <option value="MTech">MTech </option>
                    <option value="Phd">Phd </option>
                    <option value="CA">CA </option>
                    <option value="MS">MS </option>
                  </select>
            </div>
            <div className="row demo1">
              <label htmlFor="city" className="col-5 text-center signup-input">
                City
              </label>
              <input
                type="text"
                name="city"
                className="col-7 demo"
                id="city"
                placeholder="Enter your city"
                onChange={handleInputChange}
              ></input>
            </div> 
            <div className="row demo1">
              <label
                htmlFor="password"
                className="col-5 text-center signup-input"
              >
                Pincode
              </label>
              <input
                type="number"
                name="pincode"
                className="col-7 demo"
                placeholder="577201"
                onChange={handleInputChange}
                id="pincode"
                minlength={4}
                maxlength={6}
              />
            </div>
            <div className="row demo1">
              <label
                htmlFor="password"
                className="col-5 text-center signup-input"
              >
                Resume upload
              </label>
                <input
                  accept=".pdf,.doc,.docx"
                  id="resume"
                  name="resume"
                  type="file"
                  className="col-7 demo"
                  style={{paddingTop:"0.4%"}}
                />
            </div>
            {/* <div className="row demo1">
              <label
                htmlFor="mobile number"
                className="col-5 text-center signup_input"
              >
                Mobile Number
              </label>
              <input
                type="number"
                name="mobile_number"
                id="mobile_number"
                maxlength="10"
                className="col-7 demo"
                onChange={handleInputChange}
                placeholder="Mobile Number"
                required
              />
            </div> */}
            <div className="row demo1">
              <label
                htmlFor="Aadhaar number"
                className="col-5 text-center signup_input"
              >
                Aadhaar Number
              </label>
              <input
                type="number"
                name="Aadhaar_number"
                id="Aadhaar_number"
                maxlength={16}
                className="col-7 demo"
                onChange={handleInputChange}
                placeholder="Aadhaar Number"
                //required
              />
            </div>
           < div className="row demo1">
              <label
                htmlFor="pan number"
                className="col-5 text-center signup_input"
              >
                Pan Number
              </label>
              <input
                type="text"
                name="pan_number"
                id="pan_number"
                className="col-7 demo"
                onChange={handleInputChange}
                placeholder="Pan Number"
                //required
              />
            </div>
            <div className="row demo1">
              <label
                htmlFor="fathername"
                className="col-5 text-center signup-input"
              >
                Father Name
              </label>
              <input
                type="text"
                className="col-7 demo"
                name="fathername"
                onChange={handleInputChange}
                placeholder="Your Father Name"
                id="fname"
              />
            </div>
          </div>
          <div className="col-6">
            {/* <div className="row demo1">
              <label htmlFor="date" className="col-5 text-center signup_input">
                D-O-B
              </label>
              <input
                type="date"
                name="date"
                className="col-7 demo"
                onChange={handleInputChange}
                id="date"
              />
            </div> */}
            <div className="row demo1">
              <label
                htmlFor="comments"
                className="col-5 text-center signup-input"
              >
                  Comments
              </label>
              <textarea
                type="text"
                className="col-7 demo"
                name="comments"
                onChange={handleInputChange}
                // placeholder="Your Inputs"
                id="comments"
              />
            </div>
            <div className="row demo1">
              <label
                htmlFor="puc"
                className="col-5 text-center signup-input"
              >
                Candidate Status
              </label>
              <select id="status"
              type="text"
              className="col-7 demo"
              name="candidate_status"
              onChange={handleInputChange}
              placeholder="PUC/Diploma percentage" >
                <option value="">--Select Candidate Status--</option>
                <option value="placed">Placed</option>
                <option value="inprogress">Inprogress</option>
                {/* <option value="rejected">Rejected</option> */}
              </select>
            </div>
            <div className="row demo1">
              <label
                htmlFor="education"
                className="col-5 text-center signup-input"
              >
                Graduation
              </label>
              <input
                type="text"
                className="col-7 demo"
                name="graduation"
                onChange={handleInputChange}
                placeholder="graduation"
                id="graduation"
              />
            </div>
           
            <div className="row demo1 radio-container">
              <label className="col-5 text-center signup-input">Gender:</label>
              <div className="col-6">
                <div className="row">
                  <input
                    className="col-1"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleInputChange}
                  />
                  <label className="col-5 male">Male</label>
                  <input
                    className="col-1"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleInputChange}
                  />
                  <label className="col-5 female">Female</label>
                  <input
                    className="col-1"
                    type="radio"
                    name="gender"
                    value="trans"
                    onChange={handleInputChange}
                  />
                  <label className="col-3 trans">Transgender</label>
                </div>
              </div>
            </div>
             <div className="row demo1">
              <label
                htmlFor="country"
                className="col-5 text-center signup-input"
              >
                Country
              </label>
              <select
                option="country"
                name="country"
                className="col-7 demo"
                onChange={handleInputChange}
                id="country"
              >
                <option value="select">Select</option>
                <option value="Afganistan">Afganistan</option>
                <option value="Australia">Australia</option>
                <option value="Africa">Africa</option>
                <option value="Bangladesh"> Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Brazil "> Brazil </option>
                <option value="Canada"> Canada</option>
                <option value="China"> China</option>
                <option value="Colombia">Colombia</option>
                <option value="Egypt"> Egypt</option>
                <option value="France"> France</option>
                <option value="Germany"> Germany</option>
                <option value="Greece">Greece </option>
                <option value="Iceland"> Iceland</option>
                <option value="India"> India</option>
                <option value="Indonesia"> Indonesia</option>
                <option value="Italy"> Italy </option>
                <option value="Japan"> Japan</option>
                <option value="Jamaica"> Jamaica </option>
                <option value="Malaysia"> Malaysia</option>
                <option value="Maldives"> Maldives</option>
                <option value="Mexico">Mexico</option>
                <option value="New Zealand"> New Zealand</option>
                <option value=" Pakistan"> Pakistan</option>
                <option value="Sri Lanka"> Sri Lanka</option>
                <option value="Switzerland">Switzerland </option>
                <option value="United States of America">
                  {" "}
                  United States of America
                </option>
              </select>
            </div> 
             <div className="row demo1">
              <label htmlFor="state" className="col-5 text-center signup-input">
                State
              </label>
              <select
                option="state"
                name="state"
                className="col-7 demo"
                onChange={handleInputChange}
                id="select"
              >
                <option value="Select">Select</option>
                <option value="Andhra Pradesh">Andhra Pradesh </option>
                <option value="Arunachal Pradesh">Arunachal Pradesh </option>
                <option value="Assam">Assam </option>
                <option value="Bihar">Bihar </option>
                <option value="Chhattisgarh">Chhattisgarh </option>
                <option value="Goa">Goa </option>
                <option value="Gujarat">Gujarat </option>
                <option value="Haryana">Haryana </option>
                <option value="Himachal Pradesh ">Himachal Pradesh </option>
                <option value="Jammu and Kashmir">Jammu and Kashmir </option>
                <option value="Jharkhand">Jharkhand </option>
                <option value="Karnataka">Karnataka </option>
                <option value="Kerala">Kerala </option>
                <option value="Madhya Pradesh">Madhya Pradesh </option>
                <option value="Maharashtra">Maharashtra </option>
                <option value="Manipura">Manipura </option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram </option>
                <option value="Nagaland"> Nagaland</option>
                <option value="Odisha">Odisha </option>
                <option value="Punjab">Punjab </option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu </option>
                <option value="Telangana">Telangana </option>
                <option value="Tripura">Tripura </option>
                <option value="Uttar Pradesh">Uttar Pradesh </option>
                <option value="Uttarakhand">Uttarakhand </option>
                <option value="West Bengal">West Bengal </option>
              </select>
            </div> 
            
            
            
          </div>
          <form onSubmit={handleClickSubmit}>
                  <button onClick={handleClickSubmit} className="btn btn-danger" type="submit">Submit</button>
          {/* <button className="btn btn-danger">Submit</button> */}
        </form>
        </form>
      </div>
    </section>
  );
};

export default AdminCandidateUpdate;
