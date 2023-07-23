import React from 'react';
import {Text} from "../../base_component";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth,database} from "../../../configs/firebaseConfig";
import {ref, set} from "firebase/database";
import {useDispatch, useSelector} from 'react-redux';
import {closeModal} from "../../../store/slices/modalSlice";
import {RootState} from "../../../store/store";
import {Close} from '@mui/icons-material';
import AddNewUserForm from "./AddNewUserForm";
import {
   Dialog,
   DialogTitle,
   IconButton,
} from '@mui/material';

type FormValues ={
   email: string;
   password: string;
   name: string;
   role: string;
   teamID: string;
   createAt: string;
}
const AddNewUser = () => {
   const dispatch = useDispatch();
   const showModal = useSelector((state: RootState) => state.modal.showModal);
   const handleCloseModal = () => {
      dispatch(closeModal());
   };
   const AddUser = async (values:FormValues) => {
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
         const user = userCredential.user;
         await set(ref(database, `users/${user.uid}`), {
            email: user.email,
            name: values.name,
            role: values.role,
            password: values.password,
            teamID: values.teamID,
            createAt: values.createAt,
         });
         alert('success');
         handleCloseModal();
      } catch (error) {
         alert(error);
      }
   };
   return (
      <Dialog open={showModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
         <DialogTitle sx={{
            marginTop: '5px'
         }}>
            <Text {...style.text}>Create new user</Text>
            <IconButton
               sx={{
                  position: 'absolute',
                  top: 10,
                  right: 8,
                  color: (theme) => theme.palette.grey[500],
               }}
               onClick={handleCloseModal}
            >
               <Close sx={{ fontSize: '40px' }}/>
            </IconButton>
         </DialogTitle>
         <AddNewUserForm onSubmit={AddUser} />
      </Dialog>
   );
}
const style = {
   text: {
      size: '2xl' as '2xl',
      weight: 'bold' as 'bold',
      color: 'pink' as 'pink',
      font: 'A' as 'A',
      wrapperStyles: 'text-center',
   },
   textError: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end"
   },
}

export default AddNewUser;
