import React, { useContext,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
// import axios from 'axios';
const Home = () => {
  const { user, setUser,selectedAccount,setSelectedAccount } = useContext(UserContext); // Access the user data
  const [accounts] = useState(user.accounts || []);
  const navigate = useNavigate();
   
  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/accounts/${user.id}`);
  //       setAccounts(response.data); // Update local state
  //     } catch (err) {
  //       console.error('Error fetching accounts:', err);
  //     }
  //   };
  //   fetchAccounts();
  // }, [user.id]); 
  const handleLogout = () => {
    setUser(null); // Clear the user data
    navigate('/'); // Redirect to login page
  }

  const handleAddAccount = () => {
    navigate('/add-account'); // Navigate to add account page
  }

  const handleTransaction = () => {
    navigate('/transactions'); // Navigate to transactions page
  }

  const handleSendMoney = () => {
    navigate('/send-money'); // Navigate to send money page
  }
  const handleSetPrimary = () => {
    navigate('/set-primary-account');
  };
  const handleAccountSelection = (accountId) => {
    setSelectedAccount(accountId); // Set selected account ID
  
  }

  return (
    <>
    <div className="userDetails">
      <h1>Welcome, {user.firstName} {user.lastName}!</h1>
      <p className="home-info">Mobile: {user.mobileNumber}</p>
      <p className="home-info">Email: {user.email}</p>
      <p className="home-info">Address: {user.address}</p>
</div>
      {accounts && accounts.length > 0 ? (
        <div className="accountsList">
          <h2>Accounts</h2>
          <table className="Bank-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th>Transaction Limit</th>
                <th>Current Balance</th>
                <th>Primary</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountId}>
                  <td>
                    <input
                      type="radio"
                      name="selectedAccount"
                      value={account.accountId}
                      checked={selectedAccount === account.accountId}
                      onChange={() => handleAccountSelection(account.accountId)}
                    />
                  </td>
                  <td>{account.accountNumber}</td>
                  <td>{account.bankName}</td>
                  <td>{account.transactionLimit.toFixed(2)}</td>
                  <td>{account.amount.toFixed(2)}</td>
                  <td>
                    {account.isPrimary ? 'Primary' : <button onClick={() => handleSetPrimary(account.accountId)}>Set as Primary</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No accounts found. Please add an account.</p>
      )}
      <div className="transactions">
        <button className="logout" onClick={handleLogout}>Logout</button>
        <button class="AllBtn"  onClick={handleAddAccount}>Add Account</button>
        <button className="AllBtn" onClick={handleTransaction}>Transaction</button>
        <button className="AllBtn" onClick={handleSendMoney}>Send Money</button>
      </div>

  
      
  
    </>
  );
}

export default Home;
