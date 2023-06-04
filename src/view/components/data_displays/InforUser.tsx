import {Button} from "../../base_components";
import { BiUserCheck } from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {child, get, ref} from "firebase/database";
import {database} from "../../../configs/FirebaseConfig";

const InforUser = () => {
   const [data, setData] = useState<string>('');
   const userID = localStorage.getItem('user');
   useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userID}`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               const userData = snapshot.val();
               setData(userData.name)
            } else {
               throw new Error("No data available");
            }
         })
         .catch((error) => {
            throw new Error(error);
         });
   }, []);
   return (
      <Button iconLeft={<BiUserCheck size={40} className={`text-P`}/>} label={data}
              {...style.button.button}
      />
   )
}
const style = {
   button: {
      button: {
         theme:"NoneBtn" as "NoneBtn",
         size: "base" as "base",
         wrapperStyles:"w-[20%] px-36 py-0 text-xl"
      }
   }
}
export default InforUser