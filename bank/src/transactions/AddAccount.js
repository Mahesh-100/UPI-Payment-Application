import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const { user } = useContext(UserContext); // Get the logged-in user details
  const [account, setAccount] = useState({
    userId: user.id,
    bankName: '',
    accountNumber: '',
    transactionLimit: '',
    amount: 100000,
    upiPin: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  // Handle form input changes
  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/banks/link", account);
      console.log(response.data);
      
      navigate('/home')
    } catch (err) {
      setError('Error occurred while adding the account.');
      const errorResponse= err.response ? err.response.data : err.message;
      setError(errorResponse)
    }
  };

  return (
    <div className="add-account-container">
      <h2>Add New Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Bank Name:
          <select
            name="bankName"
            value={account.bankName}
            onChange={handleChange}
            required
          >
            <option value="">Select a bank</option>
            <option value="Kotak Bank">Kotak Bank</option>
<option value="HDFC Bank">HDFC Bank</option>
<option value="ICICI Bank">ICICI Bank</option>
<option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
<option value="Axis Bank">Axis Bank</option>
<option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
<option value="Bank of Baroda">Bank of Baroda</option>
<option value="Union Bank of India">Union Bank of India</option>
<option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
<option value="Canara Bank">Canara Bank</option>
<option value="Standard Chartered Bank">Standard Chartered Bank</option>
<option value="Citi Bank">Citi Bank</option>
<option value="Yes Bank">Yes Bank</option>
<option value="JPMorgan Chase">JPMorgan Chase</option>
<option value="HSBC Bank">HSBC Bank</option>

            {/* Add more banks as needed */}
          </select>
        </label>
        <label>
          Account Number:
          <input
            type="text"
            name="accountNumber"
            value={account.accountNumber}
            onChange={handleChange}
            placeholder="Enter account number"
            required
          />
        </label>
        <label>
          Transaction Limit:
          <input
            type="number"
            name="transactionLimit"
            value={account.transactionLimit}
            onChange={handleChange}
            placeholder="Enter transaction limit"
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={account.amount}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          UPI PIN:
          <input
            type="text"
            name="upiPin"
            value={account.upiPin}
            onChange={handleChange}
            placeholder="Enter 4-digit UPI PIN"
            maxLength="4"
            pattern="\d{4}"
            required
          />
        </label>
        <button type="submit">Add Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddAccount;
