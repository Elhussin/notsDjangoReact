import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
