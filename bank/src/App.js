import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import UserProvider from './context/UserContext';
import Approutes from './routes/AppRoutes';



const App = () => {
  return (
    <UserProvider>
      <Router>
        <Approutes />
      </Router>
    </UserProvider>
  );
};

export default App;
