import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {BiBell} from 'react-icons/bi';
import {Modal} from '@mui/material';
import {Button, Text} from "../../base_components";
import {RootState} from "../../../store/store";
import {database} from "../../../configs/FirebaseConfig";
import {get, ref, set, push, child} from "firebase/database";
type NotificationMessage = {
   id: string;
   message: string;
   planner_id: string;
   project_contractor_id: string;
   requestId: string;
   supply_vendor_id: string;
};
const Notification = () => {
   const [notificationMessage, setNotificationMessage] = useState<{ [key: string]: NotificationMessage }>({});
   const [open, setOpen] = useState(false);
   const limitedNotifications = Object.keys(notificationMessage)
      .slice(-5)
      .map(key => notificationMessage[key])
      .reverse();
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
   }, [notificationMessage]);

   return (
      <Box sx={{color: 'action.active'}}>
         <Badge color="secondary" variant="dot" className="hover:bg-gray-200">
            <BiBell
               size={30}
               className="text-B1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  {limitedNotifications.map(notification => (
                     <Button
                        key={notification.id}
                        size={'xs'}
                        theme={'NotiBtn'}
                        iconLeft={<BiBell size={30} className="text-B1" onClick={handleOpenModal}/>}
                        wrapperStyles={`px-50`}
                        label={notification.message}
                     ></Button>
                  ))}
                  <div className={` w-full flex flex-row gap-5`}>
                     <Button
                        label="CLOSE"
                        {...style.buttonClose}
                        onClick={handleCloseModal}
                     />
                  </div>
               </div>
            </div>
         </Modal>
      </Box>
   );
};

const style = {
   modalWrapper: "fixed top-[-34%] right-6 bottom-0 flex items-center focus:outline-none ",
   modalContent: " w-[500px] bg-B2 rounded-lg px-5 py-16 flex flex-col gap-7",
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
      wrapperStyles: "w-1/3 border border-P2 bg-P2  mt-7"
   },
}

export default Notification;

