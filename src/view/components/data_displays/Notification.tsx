import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {BiBell} from 'react-icons/bi';
import {Modal} from '@mui/material';
import {Button, Text} from "../../base_components";
import {useGetData} from "../../../hooks";

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

   const getDataNotification = useGetData('notification', (snapshot) => {
      if (snapshot.exists()) {
         setNotificationMessage(snapshot.val());
      } else {
         console.log('No data available');
      }
   });

   if (getDataNotification) {
      return <div>Loading...</div>;
   }

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
                        label="Make all as read"
                        {...style.buttonModalBtn}
                     />
                  </div>
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
   modalWrapper: "fixed right-6 mt-[4%] flex items-center focus:outline-none ",
   modalContent: " w-[450px] bg-B2 rounded-2xl px-5 pb-16 pt-10 flex flex-col gap-7",
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
   modalHeader:"pb-3 border-b-[1px] border-b-P flex flex-row justify-between pb-8",
   buttonModalBtn:{
      color:"pink" as "pink",
      theme:"A" as "A",
      size:"xxs" as "xxs",
      wrapperStyles:"underline px-0 py-0 ",

   }
}

export default Notification;

