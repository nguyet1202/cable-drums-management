import { Navigate } from 'react-router-dom';
import React from 'react';

type PrivateRouteProps = {
   authenticated: boolean
   role: "admin" | "supply_vendor" | "planner" | "project_contractor" | ("planner" | "supply_vendor")[];
   element: React.ComponentType;
}

export const PrivateRoute = ({ element: Element, authenticated, role }: PrivateRouteProps) => {
   const userRole = localStorage.getItem('role');
   console.log(userRole, authenticated);

   const isUserRoleAllowed =
      typeof userRole === 'string' &&
      (Array.isArray(role) ? role.includes(userRole as ("planner" | "supply_vendor")) : userRole === role);

   return authenticated && isUserRoleAllowed ? (
      <Element />
   ) : (
      <Navigate to="/login-require" replace />
   );
};
