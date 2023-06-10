import React from 'react';
import {Button, Input, Select, Text} from "../../base_components";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, database} from "../../../configs/FirebaseConfig";
import {ref, set} from "firebase/database";
import {Modal} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {closeModal} from "../../../store/slices/modalSlice";
import {RootState} from "../../../store/store";
import { AiFillCloseCircle } from "react-icons/ai";
import {useFormik} from "formik";
import * as Yup from "yup";

const AddNewUser = () => {
   const dispatch = useDispatch();
   const showModal = useSelector((state: RootState) => state.modal.showModal);
   const handleCloseModal = () => {
      dispatch(closeModal());
   };
   const AddUser = async () => {
      try {
         if (!formik.values.email || !formik.values.password || !formik.values.role || !formik.values.teamID) {
            throw new Error("Please enter your email, password, and role to sign up");
         }
         const userCredential = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
         const user = userCredential.user;
         await set(ref(database, `users/${user.uid}`), {
            email: user.email,
            password: formik.values.password,
            role: formik.values.role,
            ...(formik.values.role === "planner" && { planner_id: formik.values.teamID }),
            ...(formik.values.role === "supply_vendor" && { supply_vendor_id: formik.values.teamID }),
            ...(formik.values.role === "project_contractor" && { project_contractor_id: formik.values.teamID }),
         });
         alert('success');
         handleCloseModal();
      } catch (error) {
         alert(error);
      }
   };

   const formik = useFormik({
      initialValues: {
         role: '',
         email: '',
         password: '',
         teamID:'',
      },
      validationSchema: Yup.object({
         email: Yup.string().email('Invalid email').required('Email is required'),
         password: Yup.string()
            .min(8, 'The password should be greater than 8 characters')
            .required('This is a required field')
            .matches(
               /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
               "The password format is not valid"
            ),
         role: Yup.string().required('Role is required'),
         teamID: Yup.string().required('Team ID is required')
      }),
      onSubmit: AddUser,
   });

   return (
      <Modal
         open={showModal}
         onClose={handleCloseModal}
         aria-labelledby="modal-title"
         aria-describedby="modal-description"
      >
         <div className={style.modalWrapper}>
            <div className={style.modalContent}>
               <div className={`flex flex-row gap-5`}>
                  <div className={`flex flex-col gap-10 `}>
                     <Text {...style.text}>REGISTER</Text>
                     <div className={`flex flex-col gap-3`}>
                        <Select
                           id="role"
                           name="role"
                           {...style.select}
                           className={`border ${formik.touched.role && formik.errors.role ? 'w-[200px] border-0 border-P outline-0 px-[120px]' : 'border-0'}`}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.role}
                        >
                           <option value={""} disabled>Choose your role</option>
                           <option value="admin">Admin</option>
                           <option value="planner">Planner</option>
                           <option value="supply_vendor">Supply Vendor</option>
                           <option value="project_contractor">Project Contractor</option>
                        </Select>
                        {formik.touched.role && formik.errors.role && (
                           <Text {...style.textError}>{formik.errors.role}</Text>
                        )}
                     </div>
                     <div className={`flex flex-col gap-3`}>
                     <Input
                        id="email"
                        name="email"
                        {...style.inputEmail}
                        wrapperStyles={`border ${formik.touched.email && formik.errors.email ? 'border-P' : 'border-0'}`}
                        label="Enter email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                     />
                     {formik.touched.email && formik.errors.email && (
                        <Text {...style.textError}>{formik.errors.email}</Text>
                     )}
                  </div>
                     <div className={`flex flex-col gap-3 `}>
                        <Input
                           id="password"
                           name="password"
                           {...style.inputEmail}
                           wrapperStyles={`border ${formik.touched.password && formik.errors.password ? 'border-P outline-0' : 'border-0'}`}
                           label="Password"
                           type="password"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                           <Text {...style.textError}>{formik.errors.password}</Text>
                        )}
                     </div>
                     <div className={`flex flex-col gap-3`}>
                        <Input
                           id="teamID"
                           name="teamID"
                           {...style.inputEmail}
                           wrapperStyles={`border ${formik.touched.teamID && formik.errors.teamID ? 'border-P' : 'border-0'}`}
                           label="Your team ID"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.teamID}
                        />
                        {formik.touched.teamID && formik.errors.teamID && (
                           <Text {...style.textError}>{formik.errors.teamID}</Text>
                        )}
                     </div>
                     <Button type="button" {...style.submitBtn} label="Register" onClick={AddUser}/>
                  </div>
               </div>
               <Button
                  label=""
                  iconLeft={<AiFillCloseCircle size={60}/>}
                  {...style.buttonClose}
                  onClick={handleCloseModal}
               />
            </div>
         </div>
      </Modal>
   );
}

const style = {
   modalWrapper: "fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30",
   modalContent: "bg-W rounded px-16 py-16 flex flex-row gap-7",
   closeButton: "bg-gray-500 text-white px-4 py-2 rounded",
   inputEmail: {
      size: 'md' as 'md',
      wrapperStyles: 'outline-0 ',
   },
   select: {
      selectSize: 'md' as 'md',
      theme: 'primary' as 'primary',
      wrapperStyles: 'border-0 border-B1 outline-0 px-[120px]',
   },
   text: {
      size: '2xl' as '2xl',
      weight: 'extrabold' as 'extrabold',
      color: 'pink' as 'pink',
      font: 'B' as 'B',
      wrapperStyles: 'text-center lg:w-full xl:text-4xl 2xl:text-4xl',
   },
   submitBtn: {
      size: "lg" as "lg",
      theme: "secondary" as "secondary",
      wrapperStyles: "w-full text-center xs:px-[17px] sm:px-[40px] sm:py-[15px] md:px-[20px] lg:px-[15px] 2xl:px-[50px]"
   },
   textError: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end"
   },
   buttonClose: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: " bg-W w-[8%] mt-[-12%] right-[5%]  py-[30px] h-[5%] ",
   },
}

export default AddNewUser;
