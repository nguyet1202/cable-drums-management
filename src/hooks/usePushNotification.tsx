import {ref, push, set} from 'firebase/database';
import {useState} from 'react';
import {database} from "../configs/firebaseConfig";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const usePushNotification = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const role = useSelector((state: RootState) => state.user.data.role);

   const pushNotification = async (
      newRequestId: string,
      supply_vendor_id: string,
      project_contractor_id: string,
      planner_id: string,
   ) => {
      setIsLoading(true);
      const withdrawNotisRef = ref(database, 'notification');
      const newNotiRef = push(withdrawNotisRef);
      const newNotiId = newNotiRef.key;
      const message =
         role === "project_contractors"
            ? `project contractor ${project_contractor_id} updated the status of request ${newRequestId}`
            : role === "supply_vendors" ? `supply vendor ${supply_vendor_id} updated the status of request ${newRequestId}`
               : `Planner team ${planner_id} created a new request ${newRequestId}`;
      const notification = {
         id: newNotiId || '',
         requestId: newRequestId || '',
         supply_vendor_id,
         project_contractor_id,
         planner_id,
         created_at: new Date().toLocaleDateString(),
         message: message,
      };
      await set(newNotiRef, notification);
   };

   return {pushNotification, isLoading, error};
};

export default usePushNotification;
