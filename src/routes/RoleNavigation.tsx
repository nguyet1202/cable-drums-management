import { getAuth, onAuthStateChanged } from "firebase/auth";
import {ReactElement, useEffect, useState} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
export const AuthNavigation = () => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [loading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      const authInstance = getAuth();
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
         setIsLoggedIn(!!user);
         setIsLoading(false)
      });

      return () => {
         unsubscribe();
      };
   }, []);

   return { isLoggedIn,loading };
};
type PrivateRouteProps={
   authenticated:boolean
   role:string
  element: React.ComponentType;
}
export const PrivateRoute = ({ element: Element, authenticated, role }: PrivateRouteProps) => {
   const userRole = localStorage.getItem('role');
   console.log('role', role);
   return authenticated && userRole === role ? (
      <Element />
   ) : (
      <Navigate to="/" replace />
   );
};
