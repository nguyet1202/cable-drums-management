import { useEffect, useState } from 'react';
import { get, ref, onValue, DataSnapshot, DatabaseReference } from 'firebase/database';
import { database } from '../configs/FirebaseConfig';

type SnapshotCallback = (snapshot: DataSnapshot) => void;

const useGetData = (path: string, callback: SnapshotCallback) => {
   const [isLoading, setIsLoading] = useState(true);
   const [databaseRef, setDatabaseRef] = useState<DatabaseReference | null>(null);

   useEffect(() => {
      const newDatabaseRef: DatabaseReference = ref(database, path);
      setDatabaseRef(newDatabaseRef);

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

