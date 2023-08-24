
import  "./css/Login_module.css"
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import "./css/Style.css"
import axios from "axios";


function Login() {
    const navigate=useNavigate('')
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/emp_login', formData)
        .then(response => {
          let author = response.data
          if(author.user === "admin"){
            navigate("/Dashboard");
          }
          if(author.user === "candidate"){
            localStorage.setItem("username", formData.username);
            navigate("/CandidateUpdate");
          }
            })
      .catch(error => {
        console.error('Error:', error);
        alert("Enter the valid details")
      });
 }
 
  return (
<section id="test">
      <div className='container'>
        <form action="email" className="login_form row" onSubmit={handleSubmit}>
            <div className='col-6'>
                <img className='img_login' src="img/Home-office-setup.jpg" alt='icon'/>
            </div>
            <div className='col-5' style={{padding:"5%"}}>
                <h2 className='text-center' style={{margin:"0"}}> User Login</h2><br />
                <div className='username row'>
                <i className="col-1 font-icons fa fa-user-circle"></i>
                <input className='col-11 area' type="textarea" placeholder="Enter Username" id="text" name="username" onChange={handleInputChange}/>
                </div>
                <div className='username row'>
                <i className="col-1 font-icons fa fa-unlock-alt"></i>
                <input className='col-9 area password-container' type={showPassword ? "text" : "password"} placeholder="Enter password" id="pass" name="password" onChange={handleInputChange}/><br />
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={togglePasswordVisibility} id="togglePassword"></i>
                </div><br/>
                <div className='row'>
                <input className='col-1 checkbox_login' type="checkbox" /><p className='col-10'>Remember me ?</p></div>
                <button className='btn btn-primary' type="submit">Submit</button><br /><br />
                <a style={{color:"#fff"}} onClick={()=>navigate('Signup') }>Don't have an account? Sign up here!</a>
            </div>
        </form>
    </div>
    </section>
  );
}

export default Login;