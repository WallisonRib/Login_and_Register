// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ( {children} ) => {
  const token = localStorage.getItem('token');
  //FAZER APP POST NA ROTA DE CHECAGEM DE TOKEN
  

  return  token ? children : <Navigate to="/" />;
};

export default PrivateRoute;