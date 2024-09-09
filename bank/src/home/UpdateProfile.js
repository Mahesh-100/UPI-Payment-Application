import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext); // Access the user data
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNumber: user.mobileNumber,
    email: user.email,
    pin:user.pin,
    address: user.address
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/users/update/${user.id}`, formData);
      setUser(response.data); // Update user context with new data
      navigate('/home'); // Navigate back to home page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            pattern="\d{10}" // Mobile number should be 10 digits
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          PIN:
          <input
            type='password'
            name='pin'
            value={formData.pin}
            onChange={handleInputChange}
            maxLength={6}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className="button" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
