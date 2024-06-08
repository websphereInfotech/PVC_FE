// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('type');
  if (token === 'C') {
    return <Component />;
  }

  return <Navigate to="*" replace />;
};
export default ProtectedRoute;
