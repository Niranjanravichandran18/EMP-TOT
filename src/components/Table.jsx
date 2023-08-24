import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Graphs from "./Graphs";

const Table = () => {
  const navigate = useNavigate("");
  const [searchCandidate, setSearchCandidate] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [candidateDetails,setCandidateDetails] = useState([])

  const handleEditButtonClick = () => {
    localStorage.setItem("username", candidateDetails[0].email_id);
    navigate('/AdminCandidateUpdate');
  }

  function searchDetails(){
    axios
    .post("http://localhost:3001/emp_dashboard",{searchValue})
    .then((res) => {
      setSearchCandidate(res.data);
    })
  }

  function handleClick(id) {
    axios
      .post("http://localhost:3001/candidate_details",{id:id})
      .then((response) => {
        setCandidateDetails(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
     searchDetails();
  }, []);

  return (
    <div>
      <div>
        <div className="report-container">
          <div className="report-header">
            <h1 className="recent-Articles">Candidate Details</h1>
            <div className="searchbar">
          <input type="text" placeholder="Search" onChange={(e)=>{setSearchValue(e.target.value)}} />
          <div className="searchbtn" onClick={() => searchDetails()}>
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            /> 
          </div>
        </div>
          </div>
          
          <div className="report-body">
            <div className="report-topic-heading">
              <h3 className="t-op text-danger font-weight-bold text-center col-1">Reg.ID</h3>
              <h3 className="t-op text-danger font-weight-bold text-center col-1">Name</h3>
              {/* <h3 className="t-op">Email</h3> */}
              <h3 className="t-op text-danger font-weight-bold text-center col-1">Skills</h3>
              <h3 className="t-op text-danger font-weight-bold text-center col-1">Education</h3>
              {/* <h3 className="t-op">Current company name</h3> */}
              {/* <h3 className="t-op">Mobile Number</h3>    */}
              <h3 className="t-op text-danger font-weight-bold text-center">Status</h3>
            </div>

            <div className="items">
              {searchCandidate.map((value, index) => (
                <div className="item1" key={index}>
                  <h3 className="t-op-nextlvl text-center">{value.candidate_id}</h3>
                  <h3 className="t-op-nextlvl text-center">
                    {value.firstname} {value.lastname}
                  </h3>
                  <h3 className="t-op-nextlvl">{value.skills}</h3>
                  <h3 className="t-op-nextlvl col-3 text-center">{value.graduation}</h3>
                  {/* <h3 className="t-op-nextlvl">{value.mobile_number}</h3> */}
                  <h3 className="t-op-nextlvl text-center">
                    <i className="label-tag">{value.Placed} </i>{" "}
                    <i
                      onClick={() => handleClick(value.id)}
                      class="fa fa-cog"
                      data-target="#exampleModal"
                      data-toggle="modal"
                    ></i>
                  </h3>
                </div>
              ))}
              <div style={{paddingTop:"5rem"}}
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Candidate Details
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* <div className="report-body">
                                  </div> */}
                          <div className="items">
                            {candidateDetails.map((value, index) => (
                              <div className="item1 row" key={index}>
                                <div className="col-lg-6 col-12">
                                  <h3 className="t-op-nextlvl">
                                    Reg. ID :  {value.candidate_id}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    First Name :  {value.firstname}{" "}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Last Name :  {value.lastname}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Email :  {value.email_id}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Mobile Number :  {value.mobile_number}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    D-O-B :  {value.dob}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                   Designation :  {value.designation}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                   Aadhaar Number:  {value.aadhaar_number}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                   Pan Number :  {value.pan_number}
                                  </h3>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <h3 className="t-op-nextlvl">
                                   10th Percentage :  {value.sslc}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                  Puc/Diploma Percentage :  {value.puc}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                   Graduation :  {value.graduation}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                   Post Graduation :  {value.post_graduation}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Father Name :  {value.father_name}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Gender :  {value.gender}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Country :  {value.country}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    State :  {value.state}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    City :  {value.city}
                                  </h3>
                                  <h3 className="t-op-nextlvl">
                                    Pincode :  {value.pincode}
                                  </h3>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Cancel
                      </button>
                      <button type="button" class="btn btn-primary" onClick={() => handleEditButtonClick()}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Graphs />
    </div>
  );
};

export default Table;
