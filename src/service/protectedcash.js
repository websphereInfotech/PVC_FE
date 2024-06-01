// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
export const getTokenType = () => {
  const token = localStorage.getItem('type');
  return token;
};

const ProtectedRoute = ({ element: Component }) => {
  const tokenType = getTokenType();
  console.log(tokenType, 'tokenType');
  if (tokenType === 'C') {
    return <Component />;
  }

  return <Navigate to="/404" replace />;
};
export default ProtectedRoute;
