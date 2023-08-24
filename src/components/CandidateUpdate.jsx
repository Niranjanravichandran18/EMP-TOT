import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./css/Style.css";
import axios from "axios";

const CandidateUpdate = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({});
  let username=localStorage.getItem("username");

  function handleInputChange(event) {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value,["username"]:username });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:3001/candidate_update", formData)
      .then((response) => {
        if (response.data === true) {
          navigate("/");
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <section id="test1">
      <div className="container">
        <section>
          <h2
            className="text-center signup_heading"
            style={{ color: "#fff", paddingTop: "1%" }}
          >
            Update Your Profile
          </h2>
        </section>
        <form className="signup_form  row" onSubmit={handleSubmit}>
          <div className="col-6">           
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
                <option value="Select">Select</option>
                <option value="software developer">Software Developer</option>
                <option value="Software Tester">Software Tester</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Web designer">Web Designer</option>
                <option value="Python Developer">Python Developer</option>
                <option value="Automation Tester">Automation Tester</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Team Leader">Team Leader</option>
                <option value="HR">HR</option>
                <option value="Junior Software Developer">Junior Software Developer</option>
                <option value="Technical support">Technical Support</option>
                <option value="senior enineer">Senior Software Engineer</option>
                <option value="Assistant Manager">Assistant Manager</option>
                <option value="Manager">Manager</option>
                <option value="Finance">Finance Analyst</option>
                <option value="Finance">Finance Manager</option>
                <option value="IOS">IOS Developer</option>
                <option value="MERN">MERN developer</option>
                <option value="MEAN">MEAN Developer</option>
                <option value="UI\UX">UI\UX Developer</option>
                <option value="Assistant Manager">Assistant Manager</option>
              </select>
            </div>
            
          </div>
          <div className="col-6">
            </div>
            <div className="col-6">
                <div className="row demo1">
                  <label htmlFor="state" className="col-5 text-center signup-input">
                  Post Graduation
                  </label>
                  <select
                    option="post graduation"
                    name="post_graduation"
                    className="col-7 demo"
                    onChange={handleInputChange}
                    id="select"
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
              />
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
                minlength="4"
                maxlength="6"
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
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  name="resume"
                  type="file"
                  className="col-7 demo"
                  style={{paddingTop:"0.4%"}}
                />
            </div>
          </div>
          <button className="btn btn-primary btn-secondary">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default CandidateUpdate;
