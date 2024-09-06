import React, { useState, useContext } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const SendMoney = () => {
  const { selectedAccount } = useContext(UserContext); // Get selected account
  const [receiverMobile, setReceiverMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const navigate = useNavigate();

  
  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      setError('No account selected.');
      return;
    }

    if (!upiPin) {
      setShowPinPrompt(true);
      return;
    }

    try {
      // API call to process the transaction
      const response = await axios.post(`http://localhost:8080/banks/sendMoney/${selectedAccount}`, {
        receiverMobile,
        amount,
        upiPin,
      });
      if (typeof response.data.message === 'string') {
        setSuccessMessage(response.data.message);
      } else {
        // If the message is an object, convert it to a string
        setSuccessMessage(JSON.stringify(response.data.message));
      }
  
      setError('');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
        const errorResponse=err.response ? err.response.data : err.message
      setError(errorResponse);
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container">
      <h2>Send Money</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSend} className="form-container">
        <label>
          Receiver's Mobile Number:
          <input
            type="text"
            value={receiverMobile}
            onChange={(e) => setReceiverMobile(e.target.value)}
            placeholder="Enter receiver's mobile number"
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>

      {showPinPrompt && (
        <div className="pin-prompt">
          <h3>Enter UPI PIN</h3>
          <input
            type="password"
            value={upiPin}
            onChange={(e) => setUpiPin(e.target.value)}
            placeholder="Enter UPI PIN"
            maxLength="4"
            pattern="\d{4}"
            required
          />
          <button onClick={handleSend}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
