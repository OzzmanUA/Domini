import React, { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from './AuthProvider';


const ProtectedRoute = () => {
    const { user } = useContext(AuthContext); // Get the user from AuthContext
  
    return user ? <Outlet /> : <Navigate to="/" />;
  };
  
  export default ProtectedRoute;