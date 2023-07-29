import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, DialogActions, DialogContent,} from '@mui/material';
import {Send} from '@mui/icons-material';
import useGetData from "../../../hooks/useGetData";
import {BaseSelect,Text,InputMUI} from "../../base_component";


type FormValues = {
   amount: number;
   contract_id: string;
   project_contractor_name: string;
};

type addNewUserFormProps = {
   onSubmit: (values: FormValues) => void;
   contractAmount?:number;
};
const WithdrawRequestForm = (props: addNewUserFormProps) => {

   const [contractID, setContractID] = useState<string[]>([]);

   const [contractor, setContractor] = useState<string[]>([]);

   const contractorNames = contractor.map((contractorItem: any) => contractorItem.teamname || '');

   const initialValues: FormValues = {
      amount: 0,
      contract_id: '',
      project_contractor_name: '',
   };

   const validationSchema = Yup.object({
      amount: Yup.number()
         .typeError('Amount must be a number')
         .moreThan(0, 'Amount must be greater than 0')
         .required('Amount is required'),
      contract_id: Yup.string().required('Contract ID is required'),
      project_contractor_name: Yup.string().required('Project Contractor Name is required'),
   });

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => props.onSubmit(values),
   });

   const renderInputField = (id: keyof FormValues, label: string, type: string) => {

      const value = formik.values[id] ?? formik.values[id].toString();

      return (
         <InputMUI
            id={id}
            label={label}
            type={type}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
         />
      );
   };

   useGetData('project_contractors', (snapshot) => {
      if (snapshot.exists()) {
         const Data = snapshot.val();
         setContractor(Data)
      } else {
         console.log('No data available');
      }
   });

   useGetData('contracts', (snapshot) => {
      if (snapshot.exists()) {
         const Data = snapshot.val();
         const ListContractID = Data ? Object.keys(Data) : [];
         setContractID(ListContractID)
      } else {
         console.log('No data available');
      }
   });

   return (
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 mb-10 px-5 h-[400px]">
         <DialogContent>
            <div className="flex flex-col gap-8">
               <div>
                  <BaseSelect
                     id="contract_id" name="contract_id" labelId="mySelectLabel" label="Contract ID"
                     options={contractID}
                     value={formik.values.contract_id}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                  {formik.touched.contract_id && formik.errors.contract_id && (
                     <Text {...style.textErrorselect}>
                        {formik.errors.contract_id}
                     </Text>
                  )}
               </div>
               {renderInputField('amount', 'Quantity', 'number')}
               {formik.touched.amount && formik.errors.amount && (
                  <Text {...style.textError}>
                     {formik.errors.amount}
                  </Text>
               )}
               <div className={'mt-4'}>
                  <BaseSelect
                     id="project_contractor_name" name="project_contractor_name" labelId="mySelectLabel" label="Contractor Name"
                     options={contractorNames}
                     value={formik.values.project_contractor_name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                  {formik.touched.project_contractor_name && formik.errors.project_contractor_name && (
                     <Text {...style.textErrorselect}>
                        {formik.errors.project_contractor_name}
                     </Text>
                  )}
               </div>
            </div>
         </DialogContent>
         <DialogActions sx={{px: '10px'}}>
            <Button type="submit" variant="contained" endIcon={<Send/>} sx={{py: '12px', px: '16px'}}>
               Submit
            </Button>
         </DialogActions>
      </form>
   )
}
const style = {
   textError: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end mb-[-10px] mt-[-18px]"
   },
   textErrorselect: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end mt-2"
   }
}
export default WithdrawRequestForm