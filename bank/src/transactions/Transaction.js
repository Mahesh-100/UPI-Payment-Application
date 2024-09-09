import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { formatDate } from './formatDate';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  
  const { selectedAccount } = useContext(UserContext);
  useEffect(() => {
    // Fetch transactions from the API
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transactions/${selectedAccount}`);
        setTransactions(response.data.transactions);
      } catch (err) {
       
        console.error('Error:', err.response ? err.response.data : err.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-page">
      <h2>Transaction History</h2>
     
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Recipient</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.recipient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transaction;
