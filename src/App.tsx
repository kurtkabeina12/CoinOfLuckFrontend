import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/friends' element={<FriendsPage />} />
        <Route path='/tasks' element={<TasksPage />} />
        <Route path='/'>
          <HomeRouter />
        </Route>
      </Routes>
    </Router>
  );
}

const HomeRouter = () => {
  const { id, username } = useParams();

  // Вывод userId и username в alert
  const showUserInfo = () => {
    alert(`User ID: ${id}, Username: ${username}`);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {id && username ? (
          <button onClick={showUserInfo}>Показать информацию о пользователе</button>
        ) : (
          <p>Откройте приложение на вашем смартфоне</p>
        )}
      </header>
    </div>
  );
};

export default App;
