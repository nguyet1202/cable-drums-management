import React, { useState } from 'react';
import { FormAuthen } from '../../components';
import { Button } from "../../base_components";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, database } from "../../../configs/FirebaseConfig";
import { ref, set } from "firebase/database";
import { Modal} from '@mui/material';
type AddNewUserProps = {
   onClose: () => void;
   open: boolean;
}

type RegisterRole = "admin" | "supply_vendor" | "planner" | "project_contractor";

const AddNewUser = ({  open, onClose }: AddNewUserProps) => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [role, setRole] = useState<RegisterRole>( 'admin' );

   const AddUser = async () => {
      try {
         if (!email || !password || !role) {
            throw new Error("Please enter your email, password, and role to sign up");
         }
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         await set(ref(database, `users/${user.uid}`), {
            email: user.email,
            password: password,
            role: role
         });
         onClose();
         console.log('succes')
      } catch (error) {
         console.error('Error:', error);
      }
   };


   return (
      <Modal
         open={open}
         onClose={onClose}
         aria-labelledby="modal-title"
         aria-describedby="modal-description"
      >
         <div className={style.modalWrapper}>
            <div className={style.modalContent}>
               <FormAuthen
                  type={"text"}
                  title={"REGISTER"}
                  role={role}
                  email={email}
                  password={password}
                  onRoleChange={(event) => setRole(event.target.value as RegisterRole)}
                  onEmailChange={(event) => setEmail(event.target.value)}
                  onPasswordChange={(event) => setPassword(event.target.value)}
               />
               <Button type="button" {...style.submitBtn} label="Register" onClick={AddUser} />
               <Button
                  label="CLOSE"
                  {...style.buttonClose}
                  onClick={onClose}
               />
            </div>
         </div>
      </Modal>
   );
}

const style = {
   modalWrapper: "fixed top-0 left-80 right-20 bottom-0 flex items-center justify-center bg-black bg-opacity-30",
   modalContent: "bg-P3 rounded px-16 py-16 flex flex-col gap-7",
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
      size:"sm" as "sm",
      theme:"A" as "A",
      wrapperStyles:"border border-G mt-7"
   },
}

export default AddNewUser;
