import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, DialogActions, DialogContent,} from '@mui/material';
import {Send} from '@mui/icons-material';
import {InputMUI, Text, BaseSelect} from "../../base_components";
import {PasswordField} from "../../components/data_display";
import {get, ref} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";

type FormValues = {
   role: string;
   email: string;
   name: string;
   teamID: string;
   password: string;
   createAt: string;
};
type AddNewUserFormProps = {
   onSubmit: (values: FormValues) => void;
};

const ValueSelect: string[] = ['supply_vendors', 'planner', 'project_contractors'];

const AddNewUserForm = (props: AddNewUserFormProps) => {
   const [teamID, setTeamID] = useState<string[]>([]);
   const formik = useFormik<FormValues>({
      initialValues: {
         role: '',
         email: '',
         name: '',
         teamID: '',
         password: '',
         createAt: new Date().toLocaleDateString(),
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email').required('Email is required'),
         name: Yup.string().required('Name is required'),
         role: Yup.string().required('Role is required'),
         teamID: Yup.string().required('Team ID is required'),
         password: Yup.string()
            .min(8, 'The password should be greater than 8 characters')
            .required('This is a required field')
            .matches(
               /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
               'The password format is not valid'
            ),
      }),
      onSubmit: (values) => props.onSubmit(values),
   });

   const renderInputField = (id: keyof FormValues, label: string, type: string) => {
      return (
         <InputMUI
            id={id}
            label={label}
            type={type}
            value={formik.values[id]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
         />
      );
   };
   useEffect(() => {
      const fetchTeamIDs = async () => {
         if (formik.values.role) {
            const roleRef = ref(database, `${formik.values.role}`);
            const snapshot = await get(roleRef);
            const userData = snapshot.val();
            const teamIDs = userData ? Object.keys(userData) : [];
            setTeamID(teamIDs);
         } else {
            console.log('No data');
         }
      };

      fetchTeamIDs();
   }, [formik.values.role]);


   return (
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 mb-5 px-5 h-[600px]">
         <DialogContent>
            <div className="flex flex-col gap-3">
               <div>
                  <BaseSelect
                     id="role"
                     name="role"
                     labelId="mySelectLabel"
                     label="Role"
                     options={ValueSelect}
                     value={formik.values.role}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                  {formik.touched.role && formik.errors.role && (
                     <Text {...style.textErrorselect}>
                        {formik.errors.role}
                     </Text>
                  )}
               </div>
               {renderInputField('name', 'Name', 'text')}
               {formik.touched.name && formik.errors.name && (
                  <Text {...style.textError}>
                     {formik.errors.name}
                  </Text>
               )}
               {renderInputField('email', 'Email', 'text')}
               {formik.touched.email && formik.errors.email && (
                  <Text {...style.textError}>
                     {formik.errors.email}
                  </Text>
               )}
               <PasswordField value={formik.values.password}
                              id="password"
                              label="password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
               />
               {formik.touched.password && formik.errors.password && (
                  <Text {...style.textError}>{formik.errors.password}</Text>
               )}
               <div className={`mt-8`}>
                  <BaseSelect
                     id="teamID"
                     name="teamID"
                     labelId="mySelectLabel"
                     label="Team ID"
                     options={teamID}
                     value={formik.values.teamID}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                  {formik.touched.teamID && formik.errors.teamID && (
                     <Text {...style.textErrorselect}>
                        {formik.errors.teamID}
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
   );
};
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
      wrapperStyles: "flex justify-end items-end mt-2"
   }
}
export default AddNewUserForm;
