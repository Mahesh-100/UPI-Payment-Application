import React, { useState,useContext } from 'react';
import axios from 'axios';
import {  Link,useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";



const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    firstName: '',
    lastName:'',
    mobileNumber: '',
    email: '',
    pin: '',
    address: ''
  });
  const { setUser } = useContext(UserContext); 
const navigate=useNavigate()

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/register", {
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        mobileNumber: registerUser.mobileNumber,
        email: registerUser.email,
        pin: registerUser.pin,
        address: registerUser.address
      });
      console.log(response.data);
      // const user=new User(response.data);//response.data.firstName,response.data.lastName,response.data.mobileNumber,response.data.email, response.data.address
      setUser(response.data);
      navigate('/home')
    } catch (err) {
      console.error('Error occurred:', err.response ? err.response.data : err.message);
    }
  }

  const handleChange = (e) => {
    setRegisterUser({
      ...registerUser,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
          <h2>Register</h2>
      <form onSubmit={handleForm} className="form-container">
        <label>
          First Name:
          <input
            type='text'
            name='firstName'
            value={registerUser.firstName}
            onChange={handleChange}
            placeholder='Enter your first name'
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            name='lastName'
            value={registerUser.lastName}
            onChange={handleChange}
            placeholder='Enter your last name'
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type='text'
            name='mobileNumber'
            value={registerUser.mobileNumber}
            onChange={handleChange}
            placeholder='Enter your phone number'
            pattern="\d{10}" 
            maxLength={10}
            required
          />
        </label>
        <label>
          Email:
          <input
            type='text'
            name='email'
            value={registerUser.email}
            onChange={handleChange}
            placeholder='Enter your email'
            required
          />
        </label>
        <label>
          PIN:
          <input
            type='password'
            name='pin'
            value={registerUser.pin}
            onChange={handleChange}
            placeholder='Enter your 6 digit PIN '
            pattern="\d{6}" 
            maxLength={6}
            required
          />
        </label>
        <label>
          Address:
          <input
            type='text'
            name='address'
            value={registerUser.address}
            onChange={handleChange}
            placeholder='Enter your address'
            required
          />
        </label>
        <button type='submit'>Register</button>
      </form>
      <p className="main-form">Already a user? <Link to="/"><button type="submit">LOGIN</button></Link></p>
      </div>
  );
}

export default Register;
