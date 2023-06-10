import { Navigate } from 'react-router-dom';
import React from 'react';

type PrivateRouteProps = {
   authenticated: boolean
   role: "admin" | "supply_vendor" | "planner" | "project_contractor";
   element: React.ComponentType;
}

export const PrivateRoute = ({element: Element, authenticated, role}: PrivateRouteProps) => {
   const userRole = localStorage.getItem('role');
   return (authenticated && userRole === role ? (
         <Element/>
      ) : (
         <Navigate to="/login-require" replace/>
      )
   );
};