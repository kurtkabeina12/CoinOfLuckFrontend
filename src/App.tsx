import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';
import { store } from './redux-store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
