import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { BiBell } from 'react-icons/bi';
import { clearNotification, selectNotificationsCount } from '../../../store/slices/notificationSlice';
import { child, get, ref } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import { Modal } from '@mui/material';
import { closeModal, openModal } from "../../../store/slices/modalSlice";
import { FormAuthen } from "./index";
import { Button, Text } from "../../base_components";
type NotificationMessage = {
      id: string;
      message: string;
      planner_id: string;
      project_contractor_id: string;
      requestId: string;
      supply_vendor_id: string;
};

const Notification = () => {
   const dispatch = useDispatch();
   const notificationsCount = useSelector(selectNotificationsCount);
   const [notificationMessage, setNotificationMessage] = useState<{ [key: string]:NotificationMessage}>({});

   const [open, setOpen] = useState<boolean>(false);

   const handleOpenModal = () => {
      setOpen(true)
   };

   const handleCloseModal = () => {
      setOpen(false)
   };

   useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, `notification`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               const noti = snapshot.val();
               setNotificationMessage(noti);
            } else {
               console.log('nothing')
            }
         })
         .catch((error) => {
            throw new Error(error);
         });
   }, []);

   return (
      <Box sx={{ color: 'action.active' }}>
         <Badge color="secondary" badgeContent={notificationsCount} variant="dot">
            <BiBell size={30} className="text-B1" onClick={handleOpenModal} />
         </Badge>
         <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
         >
            <div className={style.modalWrapper}>
               <div className={style.modalContent}>
                  {Object.keys(notificationMessage).map((messageID) => (
                     <div className={'flex flex-row gap-6'}>
                        <BiBell size={30} className="text-B1" onClick={handleOpenModal} />
                        <Text size={'lg'} weight={'bold'} color={'pink'} key={messageID}>{notificationMessage[messageID].message}</Text>
                     </div>
                  ))}
                  <Button
                     label="CLOSE"
                     {...style.buttonClose}
                     onClick={handleCloseModal}
                  />
               </div>
            </div>
         </Modal>
      </Box>
   );
};

const style = {
   modalWrapper: "fixed top-[-60%] right-6 bottom-0 flex items-center bg-black bg-opacity-30",
   modalContent: "bg-B2 rounded px-16 py-16 flex flex-col gap-7",
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
   buttonClose:{
      size:"xs" as "xs",
      theme:"A" as "A",
      wrapperStyles:"w-1/5 border border-G mt-7"
   },
}

export default Notification;
