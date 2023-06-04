import React, {useState} from 'react';
import {Button} from "../../base_components";
import {database} from "../../../configs/FirebaseConfig";
import {get, ref, set,push} from "firebase/database";
import CreateRequestForm from "./CreateRequestForm";
import { Modal} from '@mui/material';
type CreateRequestProps = {
   onClose: () => void;
   open: boolean;
}
const CreateRequest = ({  open, onClose }: CreateRequestProps) => {
   const [contract_id, setContract_id] = useState<string>('');
   const [project_contractor_id, setProject_contractor_id] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);
   const [supply_vendor_id, setSupply_vendor_id] = useState<string>('');

   const CreateNewRequest = async () => {
      try {
         if (!contract_id || !project_contractor_id || !amount || !supply_vendor_id) {
            throw new Error("Please enter all required fields");
         }
         const snapshot = await get(ref(database, `contracts/${contract_id}`));
         const withdrawRequests = snapshot.val();
         const contractAmount = withdrawRequests.amount;
         if (Number(amount) > contractAmount) {
            throw new Error("The entered amount exceeds the current available amount");
         }
         const withdrawRequestsRef = ref(database, 'withdraw_requests');
         const newRequestRef = push(withdrawRequestsRef);
         const newRequestId = newRequestRef.key;

         const newRequest = {
            id: newRequestId,
            contract_id: contract_id,
            project_contractor_id: project_contractor_id,
            amount: amount,
            supply_vendor_id: supply_vendor_id,
            status: "new",
         };

         await set(newRequestRef, newRequest);
         onClose();
         console.log('success');
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
      <div className={style.wrapper}>
         <div className={style.modalContent}>
            <CreateRequestForm
               contract_id={contract_id}
               project_contractor_id={project_contractor_id}
               amount={amount}
               supply_vendor_id={supply_vendor_id}
               contract_idOnchange={(event) => setContract_id(event.target.value)}
               project_contractor_idOnchange={(event) => setProject_contractor_id(event.target.value)}
               amountOnchange={(event) => setAmount(Number(event.target.value))}
               supply_vendor_idOnchange={(event) => setSupply_vendor_id(event.target.value)}
            />
            <div className={`flex flex-row gap-8`}>
            <Button type="button" {...style.submitBtn} label={'Submit'} onClick={CreateNewRequest} />
            <Button
               label="CLOSE"
               {...style.buttonClose}
               onClick={onClose}
            />
            </div>
         </div>
      </div>
      </Modal>
   );
}
const style = {
   wrapper: "fixed top-0 left-80 right-20 bottom-0 flex items-center justify-center bg-black bg-opacity-90",
   modalContent: "bg-P3 rounded px-24 py-16 flex flex-col gap-7",
   mainform: "w-9/12 bg-white p-10",
   formtitle: {
      wrapperStyles: "mb-24",
      weight: "bold" as "bold",
      size: "5xl" as "5xl",
      color: "pink" as "pink",
   },
   formcontent:"flex flex-row gap-20",
   textfield:{
      wrapperStyles:"mb-2",
      size:"sm" as "sm",
   },
   input: {
      size:"base" as "base",
      theme:"formInput" as "formInput"
   },
   submitBtn: {
      size: "sm" as "sm",
      theme: "secondary" as "secondary",
      wrapperStyles:"w-2/12 border border-G mt-7"
   },
   buttonClose:{
      size:"sm" as "sm",
      theme:"A" as "A",
      wrapperStyles:" w-2/12 border border-G mt-7"
   },

}

export default CreateRequest;
