import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginForm from './LoginForm';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/admin"
            element={<PrivateRoute role="admin"><AdminPanel /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

const Dashboard = () => <h2>Dashboard</h2>;
const AdminPanel = () => <h2>Admin Panel</h2>;

export default App;
