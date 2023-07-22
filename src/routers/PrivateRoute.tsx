import { Navigate } from 'react-router-dom';
import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
type PrivateRouteProps = {
   authenticated: boolean
   role: "admin" | "supply_vendors" | "planner" | "project_contractors";
   element: React.ComponentType;
}

export const PrivateRoute = ({element: Element, authenticated, role}: PrivateRouteProps) => {
   const data = useSelector((state: RootState) => state.user.data);
   return (authenticated && data.role === role ? (
         <Element/>
      ) : (
         <Navigate to="/login-require" replace/>
      )
   );
};