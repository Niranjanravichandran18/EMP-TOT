import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import { useEffect, useState } from "react";
import Axios from 'axios';

  const Header=()=> {
  const [totalCandidates, setTotalCandidates] = useState("");
  const [candidateStatus,setCandidateStatus]=useState([])
  const goBack = () => {
    window.history.back();
  };
  
  const navigate = useNavigate("");
  const handleCreateButtonClick = () => {
    navigate('/Signup');
  }
  
  useEffect(() => {
    Axios.get("http://localhost:3001/total_candidates")
    .then((res)=>{
      setTotalCandidates(res.data[0])
    }).catch(err=>{
      console.log(err)
    })

    Axios("http://localhost:3001/emp_graphs")
    .then((response) => {
      let res = response.data;
      setCandidateStatus(res);
    }).catch((e) => {
      console.log("error", e);
    });
}, []);


return (
    <div>
      <button onClick={goBack} className="goback">
      <span>&#8592;</span> {/* Unicode character for left arrow */}
    </button>

      <header className="dashboard_header">
        <div className="logosec">
          <div className="logo" onClick={() => handleCreateButtonClick()}>+Create new candidate account</div>
        </div>
     <div className="message">
          {/* <div className="circle"></div> */}
          {/* <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt=""
          /> */}
          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>
      


      <div className="main">
         <div className="box-container">
          <div className="box box1">
            <div className="text">
              <h4 className="topic-heading">IN Progress</h4>
              <h4 className="topic">Candidates:{candidateStatus.progress}</h4>
            </div>
             <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
              alt="Views"
            />
          </div>

          <div className="box box2">
            <div className="text">
              <h4 className="topic-heading">Placed</h4>
              <h4 className="topic">Candidates :{candidateStatus.placed}</h4>
            </div>
              <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
              alt="published"
            />
          </div>

          {/* <div className="box box3">
            <div className="text">
              <h4 className="topic-heading">Rejected</h4>
              <h4 className="topic">Candidates :{candidateStatus.rejected}</h4>
            </div>
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
              alt="comments"
            />
          </div> */}

          <div className="box box4">
            <div className="text">
              <h4 className="topic-heading">Total</h4>
              <h4 className="topic">Candidates :{totalCandidates.total}</h4>
            </div>
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
              alt="likes"
            />
          </div>
        </div>
      </div>
    </div>


  );

};

export default Header;