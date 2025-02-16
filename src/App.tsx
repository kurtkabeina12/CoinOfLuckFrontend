import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/friends" element={<FriendsPage  />} />
        <Route path="/tasks" element={<TasksPage  />} />
        {/* <Route path="/" element={!isMobile ? (
          <div className="App">
            <header className="App-header">
              <p>Откройте приложение на вашем смартфоне</p>
            </header>
          </div>
        ) : (
          <Navigate to="/home" />
        )} /> */}
      </Routes>
    </Router>
  );
}

export default App;
