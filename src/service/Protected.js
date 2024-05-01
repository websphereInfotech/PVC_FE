import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
  console.log("Entering Protected component"); 
const isAuthenticated = useSelector((state) => state.customization.isAuthenticated);
  console.log("In Protected - isAuthenticated:", isAuthenticated);

  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
