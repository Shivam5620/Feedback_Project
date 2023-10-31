import React, { useState } from 'react';
import axios from "axios";


const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:2000/userreg", {
        fullName,
        username,
        email,
        phoneNumber,
        password,
      })
      .then((response) => {
        if (response.data.status === "1") {
          sessionStorage.setItem("uid", email);
          setErrorMessage("Registration successful");
          window.location = 'login';
        } else {
        }
      });

    alert(email);
  };


  return (
    <div className="container">
      <div className="title">Registration</div>
      <form onSubmit={handleRegister}>
        <div className="user__details">
          <div className="input__box">
            <span className="details">Full Name</span>
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input__box">
            <span className="details">Username</span>
            <input
              type="text"
              placeholder="Enter user name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input__box">
            <span className="details">Email</span>
            <input
              type="email"
              placeholder="abc123@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__box">
            <span className="details">Phone Number</span>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="012-345-6789"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input__box">
            <span className="details">Password</span>
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="input__box">
            <span className="details">Confirm Password</span>
            <input
              type="password"
              placeholder="********"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              
            />
          </div> */}
        </div>
        <p className="error-message">{errorMessage}</p> {/* Display error message */}


        <div className="button">
          <input type="submit" value="Register" />
        </div>
      </form>
      <div className="text-center small">
        Don't have an account? <a href="/Login">Already have an account?</a>
      </div>
    </div>
  );
};

export default Register;
