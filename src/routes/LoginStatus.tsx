import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";

const LoginStatus = () => {
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

   return {isLoggedIn, loading};
};
export default LoginStatus