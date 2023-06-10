import {Button} from "../../base_components";
import {BiUserCheck} from "react-icons/bi";
import React, {useState} from "react";
import {useGetData} from "../../../hooks";
import { useEffect } from "react";
import { child, get, ref } from "firebase/database";
import {database} from "../../../configs/FirebaseConfig";
const InforUser = () => {
   const [data, setData] = useState<string>('');
   const userID = localStorage.getItem('userID');
   const getUserInfor = useGetData(`users/${userID}`, (snapshot) => {
      if (snapshot.exists()) {
         const userData = snapshot.val();
         setData(userData.name)
      } else {
         console.log('No data available');
      }
   });

   if (getUserInfor) {
      return <div>Loading...</div>;
   }

   return (
      <Button iconLeft={<BiUserCheck size={40} className={`text-P`}/>} label={data}
              {...style.button.button}
      />
   )
}
const style = {
   button: {
      button: {
         theme: "NoneBtn" as "NoneBtn",
         size: "base" as "base",
         wrapperStyles: "w-[20%] px-36 py-0 text-xl"
      }
   }
}
export default InforUser