import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const PrimaryAccount = () => {
  const { user } = useContext(UserContext);  // User info from context
  
  const [accounts, setAccounts] = useState([]);  // List of user's accounts
  const [error, setError] = useState(''); // Error handling
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const navigate = useNavigate();
  // Fetch user accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/banks/accounts/${user.id}`);
        setAccounts(response.data);
      } catch (err) {
        setError('Failed to load accounts');
        console.error(err);
      }
    };

    fetchAccounts();
  }, [user.id]);

  // Handle the primary account selection and make an API call to set it
  const handleSetPrimary = async (accountId) => {
    try {
      const response = await axios.put(`http://localhost:8080/banks/setPrimary/${accountId}`);
     
      setSuccessMessage(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      
    } catch (err) {
      setError('Error setting primary account');
      setSuccessMessage('');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container">
      <h2>Set Primary Account</h2>

      {/* Show any success or error messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display user accounts */}
      <ul className="account-list">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <li key={account.accountId}>
              <span>{account.bankName} - {account.accountNumber}</span>
              {account.isPrimary ? (
                <span className="primary-label">Primary</span>
              ) : (
                <button
                  className="primary-button"
                  onClick={() => handleSetPrimary(account.accountId)}
                >
                  Set as Primary
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No accounts found. Please add an account.</p>
        )}
      </ul>
    </div>
  );
};

export default PrimaryAccount;
