import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {BiBell} from 'react-icons/bi';
import {Modal} from '@mui/material';
import {Button, Text} from "../../base_components";
import {equalTo, get, orderByChild, query, ref} from "firebase/database";
import {database} from "../../../configs/FirebaseConfig";
import {AiFillCloseCircle} from "react-icons/ai";
type NotificationProps = {
   id: string;
   message: string;
   planner_id: string;
   project_contractor_id: string;
   requestId: string;
   supply_vendor_id: string;
   created_at: string;
};
const Notification = () => {
   const userID = localStorage.getItem('userID');
   const [notificationMessage, setNotificationMessage] = useState<{ [key: string]: NotificationProps } | null>(null);
   const [open, setOpen] = useState(false);
   const handleOpenModal = () => {
      setOpen(true)
   };

   const handleCloseModal = () => {
      setOpen(false)
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const userDataSnapshot = await get(ref(database, `users/${userID}`));
            const userData = userDataSnapshot.val();
            if (userData.role === "planner") {
               const requestsRef = ref(database, "notification");
               const requestsQuery = query(requestsRef, orderByChild("planner_id"), equalTo(userData.planner_id));
               const requestsSnapshot = await get(requestsQuery);
               const notiData = requestsSnapshot.val();
               setNotificationMessage(notiData);
            } else if (userData.role === "supply_vendor") {
               const requestsRef = ref(database, "notification");
               const requestsQuery = query(requestsRef, orderByChild("supply_vendor_id"), equalTo(userData.supply_vendor_id));
               const requestsSnapshot = await get(requestsQuery);
               const notiData = requestsSnapshot.val();
               setNotificationMessage(notiData);
            } else if (userData.role === "project_contractor") {
               const requestsRef = ref(database, "notification");
               const requestsQuery = query(requestsRef, orderByChild("project_contractor_id"), equalTo(userData.project_contractor_id));
               const requestsSnapshot = await get(requestsQuery);
               const notiData = requestsSnapshot.val();
               setNotificationMessage(notiData);
            } else {
               setNotificationMessage(null);
            }
         } catch (error) {
            console.log(error)
            setNotificationMessage(null);
         }
      };

      fetchData();
   }, []);
   return (
      <Box sx={{color: 'action.active'}}>
         <Badge color="secondary" variant="dot" className="hover:bg-gray-200">
            <BiBell
               size={30}
               className="text-B1 focus:outline-none cursor-pointer"
               onClick={handleOpenModal}
            />
         </Badge>
         <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
         >
            <div className={style.modalWrapper}>
               <div className={style.modalContent}>
                  <div className={style.modalHeader}>
                     <Text size={`xl`}>Notification</Text>
                     <Button
                        label=""
                        iconLeft={<AiFillCloseCircle size={40}/>}
                        {...style.buttonClose}
                        onClick={handleCloseModal}
                     />
                  </div>
                  {notificationMessage === null ? (
                     <Text>No notification</Text>
                  ) : (
                     Object.keys(notificationMessage || {}).map((notificationKey) => (
                        <div>
                           <Button
                              key={notificationKey}
                              size={'xs'}
                              theme={'NotiBtn'}
                              iconLeft={<BiBell size={30} className="text-B1" onClick={handleOpenModal}/>}
                              wrapperStyles={`pl-[14%]`}
                              wrapperIconStyles={`ml-[-5%]`}
                              label={notificationMessage[notificationKey].message}
                           ></Button>
                        <Text wrapperStyles={`text-end`} size={'xs'} color={'blue'}> Create at :{notificationMessage[notificationKey].created_at}</Text>
                        </div>
                     ))
                  )}
               </div>
            </div>
         </Modal>
      </Box>
   );
};

const style = {
   modalWrapper: "fixed right-6 mt-[4%] flex items-center focus:outline-none ",
   modalContent: " w-[350px] bg-B2 rounded-2xl px-5 pb-16 pt-10 flex flex-col gap-2",
   closeButton: "bg-gray-500 text-white px-4 py-2 rounded",
   submitBtn: {
      size: "lg" as "lg",
      theme: "secondary" as "secondary",
      wrapperStyles: "w-full text-center xs:px-[17px] sm:px-[40px] sm:py-[15px] md:px-[20px] lg:px-[15px] 2xl:px-[50px]"
   },
   text: {
      size: "2xl" as "2xl",
      weight: "extrabold" as "extrabold",
      color: "pink" as "pink",
      font: "B" as "B",
      wrapperStyles: "text-center lg:w-full xl:text-4xl 2xl:text-4xl"
   },
   buttonClose: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: " w-[8%] mt-[-17%] right-[5%]  py-[0px] ",
   },
   modalHeader: "pb-3 border-b-[1px] border-b-P flex flex-row justify-between",
   buttonModalBtn: {
      color: "pink" as "pink",
      theme: "A" as "A",
      size: "xxs" as "xxs",
      wrapperStyles: "underline px-0 py-0 ",

   }
}

export default Notification;

