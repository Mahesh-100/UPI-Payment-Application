import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    mobileNumber: '',
    pin: ''
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        mobileNumber: loginUser.mobileNumber,
        pin: loginUser.pin
      });
      console.log(response.data);
      setUser(response.data);
      navigate('/home');
    } catch (err) {
      const errorResponse = err.response ? err.response.data.message : err.message;
      setErrorMessage(errorResponse);
    }
  }

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleForm} className="form-container">
        <label>
          Phone Number:
          <input
            type='text'
            name='mobileNumber'
            value={loginUser.mobileNumber}
            onChange={handleChange}
            placeholder='Enter your phone number'
            required
          />
        </label>
        <label>
          PIN:
          <input
            type='password'
            name='pin'
            value={loginUser.pin}
            onChange={handleChange}
            placeholder='Enter your 6 digit PIN'
            maxLength={6}
            required
          />
        </label>
        <button type='submit'>Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p className="form-box">New user? <Link to="/register"><button type="submit">Register</button></Link></p>
    </div>
  );
}

export default Login;
