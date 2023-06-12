import React, { useState } from 'react';
import { Button, Input, Select, Text } from "../../base_components";
import { database } from "../../../configs/FirebaseConfig";
import { get, ref, set, push } from "firebase/database";
import { Modal } from '@mui/material';
import { useGetData } from "../../../hooks";
import { useFormik } from 'formik';
import * as Yup from 'yup';

type CreateRequestProps = {
   onClose: () => void;
   open: boolean;
}

const CreateRequest = ({ open, onClose }: CreateRequestProps) => {
   const [planner_id, setPlanner_id] = useState<string>('');
   const userID = localStorage.getItem('userID');
   let contractAmount = 0;
   const currentDate = new Date();
   const formattedDateTime = currentDate.toLocaleString();
   const getDataGetPlanner = useGetData(`users/${userID}`, (snapshot) => {
      if (snapshot.exists()) {
         const getPlannerID = snapshot.val();
         setPlanner_id(getPlannerID.planner_id);
      } else {
         console.log('No data available');
      }
   });
   const CreateNewRequest = async () => {
      try {
         const snapshot = await get(ref(database, `contracts/${formik.values.contract_id}`));
         const withdrawRequests = snapshot.val();
         contractAmount = withdrawRequests.contract_amount;
         if (Number(formik.values.amount) > contractAmount) {
            alert('The entered amount exceeds the current available amount');
         }
         const withdrawRequestsRef = ref(database, 'withdraw_requests');
         const newRequestRef = push(withdrawRequestsRef);
         const newRequestId = newRequestRef.key;
         const newRequest = {
            id: newRequestId || '',
            planner_id,
            contract_id: formik.values.contract_id,
            project_contractor_id: formik.values.project_contractor_id,
            amount: formik.values.amount,
            supply_vendor_id: withdrawRequests.supply_vendor_id,
            status: 'new',
            created_at: formattedDateTime,
         };

         await set(newRequestRef, newRequest);

         if (newRequestId) {
            await pushNotification(newRequestId, withdrawRequests.supply_vendor_id, formik.values.project_contractor_id, planner_id);
         }

         onClose();
         alert('Success');
      } catch (error) {
         console.error('Error:', error);
      }
   };

   const pushNotification = async (
      newRequestId: string,
      supply_vendor_id: string,
      project_contractor_id: string,
      planner_id: string,
   ) => {
      try {
         const withdrawNotisRef = ref(database, 'notification');
         const newNotiRef = push(withdrawNotisRef);
         const newNotiId = newNotiRef.key;

         const notification = {
            id: newNotiId || '',
            requestId: newRequestId || '',
            supply_vendor_id,
            project_contractor_id,
            planner_id,
            created_at: formattedDateTime,
            message: `Planner team ${planner_id} created a new request ${newRequestId}`,
         };

         await set(newNotiRef, notification);
      } catch (error) {
         console.error('Error:', error);
      }
   };

   const initialValues = {
      amount: 0,
      contract_id: '',
      project_contractor_id: '',
   };

   const validationSchema = Yup.object({
      amount: Yup.number()
         .typeError('Amount must be a number')
         .moreThan(0, 'Amount must be greater than 0')
         .required('Amount is required'),
      contract_id: Yup.string().required('Contract ID is required'),
      project_contractor_id: Yup.string().required('Project Contractor ID is required'),
   });

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: CreateNewRequest,
   });

   if (getDataGetPlanner) {
      return <div>Loading...</div>;
   }

   return (
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
         <div className={style.wrapper}>
            <form className={style.modalContent} onSubmit={formik.handleSubmit}>
               <div>
                  <Text {...style.formtitle}>Request For Withdraw Cable Drum</Text>
                  <div className={style.formcontent} >
                     <div className="w-1/2 pr-40">
                        <div className="mb-6">
                           <Text {...style.textfield}>Contract ID</Text>
                           <Select
                              theme={'requestform'}
                              id="contract_id"
                              name="contract_id"
                              value={formik.values.contract_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              {...style.select}
                           >
                              <option></option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                           </Select>
                           {formik.touched.contract_id && formik.errors.contract_id && (
                              <Text {...style.textError}>{formik.errors.contract_id}</Text>
                           )}
                        </div>
                        <div className="mb-6">
                           <Text {...style.textfield}>Quantity</Text>
                           <Input
                              type="number"
                              id="amount"
                              name="amount"
                              value={formik.values.amount.toString()}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              {...style.input}
                           />
                           {formik.touched.amount && formik.errors.amount && (
                              <Text {...style.textError}>{formik.errors.amount}</Text>
                           )}
                        </div>

                     </div>
                     <div className="w-1/2">
                        <div className={`flex flex-row gap-10`}>
                           <div className="mb-6">
                              <Text {...style.textfield}>Project Contractor ID</Text>
                              <Select
                                 theme={'requestform'}
                                 id="project_contractor_id"
                                 name="project_contractor_id"
                                 value={formik.values.project_contractor_id}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 {...style.select}
                              >
                                 <option></option>
                                 <option value="1">contractor 1</option>
                                 <option value="2">contractor 2</option>
                                 <option value="3">contractor 3</option>
                              </Select>
                              {formik.touched.project_contractor_id && formik.errors.project_contractor_id && (
                                 <Text {...style.textError}>{formik.errors.project_contractor_id}</Text>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={`flex flex-row gap-8`}>
                  <Button type="submit"{...style.submitBtn} label={'Submit'}/>
                  <Button label="CLOSE" {...style.buttonClose} onClick={onClose} />
               </div>
            </form>
         </div>
      </Modal>
   );
};

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
   formcontent: "flex flex-row gap-20",
   textfield: {
      wrapperStyles: "mb-2",
      size: "sm" as "sm",
   },
   input: {
      size: "base" as "base",
      theme: "formInput" as "formInput"
   },
   submitBtn: {
      size: "sm" as "sm",
      theme: "secondary" as "secondary",
      wrapperStyles: "w-2/12 border border-G mt-7"
   },
   buttonClose: {
      size: "sm" as "sm",
      theme: "A" as "A",
      wrapperStyles: " w-2/12 border border-G mt-7"
   },
   textError: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end"
   },
   select:{
      wrapperStyles:"bg-P3 text-xl"
   }

}

export default CreateRequest;
