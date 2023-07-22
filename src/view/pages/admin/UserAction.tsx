import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {ref, remove, get} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";

type UserActionProps = {
   index: number;
   uid: string;
};

const UserAction = (props: UserActionProps) => {
   const handleDeleteClick = async (index: number, uid: string) => {
      try {
         const userRef = ref(database, `users/${uid}`);
         const userSnapshot = await get(userRef);

         if (userSnapshot.exists()) {
            await remove(userRef);
            alert("Successfully deleted the user.");
         } else {
            console.error("User not found.");
         }
      } catch (error) {
         console.error("Error deleting the user:", error);
      }
   };

   return (
      <IconButton onClick={() => handleDeleteClick(props.index, props.uid)} aria-label="delete" color="error">
         <DeleteIcon fontSize="large" />
      </IconButton>
   );
};

export default UserAction;