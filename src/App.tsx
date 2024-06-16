import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';

const App: React.FC = () => {

  const currentURL = window.location.href;

  const getUserIdAndUsername = (url: string) => {
    const params = new URLSearchParams(url);
    const userId = parseInt(params.get('id') || '0', 10);
    const username = params.get('username') || '';
    alert(`User ID: ${userId}, Username: ${username}`);
    return { userId, username };
    
  }

  const { userId, username } = getUserIdAndUsername(currentURL);
  
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<HomePage userId={userId} username={username} />} />
        <Route path="/friends"  element={<FriendsPage userId={userId} username={username}/>} />
        <Route path="/tasks" element={<TasksPage userId={userId} username={username} />} />
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
