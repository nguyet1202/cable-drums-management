import {useEffect, useState} from 'react';
import {ref, onValue, DataSnapshot, DatabaseReference} from 'firebase/database';
import {database} from "../configs/firebaseConfig";

type SnapshotCallback = (snapshot: DataSnapshot) => void;

const useGetData = (path: string, callback: SnapshotCallback) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const newDatabaseRef: DatabaseReference = ref(database, path);

      const handleDataSnapshot = (snapshot: DataSnapshot) => {
         callback(snapshot);
         setIsLoading(false);
      };

      const errorCallback = (error: Error) => {
         console.error('Error:', error);
         setIsLoading(false);
      };

      if (newDatabaseRef) {
         const unsubscribe = onValue(newDatabaseRef, handleDataSnapshot, errorCallback);

         return () => {
            unsubscribe();
         };
      }

      return undefined;
   }, []);

   return isLoading;
};

export default useGetData;

