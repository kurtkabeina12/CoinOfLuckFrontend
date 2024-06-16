import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';

const App: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://192.168.0.109:3000/userinfo');
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUserId(data.userId);
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage userId={userId} username={username} />} />
        <Route path="/friends" element={<FriendsPage userId={userId} username={username} />} />
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
