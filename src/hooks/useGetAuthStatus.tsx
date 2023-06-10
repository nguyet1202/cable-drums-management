import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";

const useGetAuthStatus = () => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [isloading, setIsLoading] = useState<boolean>(true);
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

   return {isLoggedIn, isloading};
};
export default useGetAuthStatus