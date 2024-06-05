// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('type');
  console.log(token, 'tokentype');
  if (token === 'C') {
    return <Component />;
  }

  return <Navigate to="/404" replace />;
};
export default ProtectedRoute;
