import React, {useState} from 'react';
import {auth} from '../../../../configs/FirebaseConfig';
import {signInWithEmailAndPassword, AuthError, UserCredential} from 'firebase/auth';
import {ref, get} from 'firebase/database';
import {database} from '../../../../configs/FirebaseConfig';
import {Button, Input, Select, Text} from '../../../base_components';
import {useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';

function SignInForm() {
   const navigate = useNavigate();
   const handleLogin = async () => {
      try {
         const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            formik.values.email,
            formik.values.password
         );

         const user = userCredential.user;
         localStorage.setItem('userID', user.uid);

         const userDataSnapshot = await get(ref(database, `users/${user.uid}`));
         const userData = userDataSnapshot.val();

         if (userData && userData.role === formik.values.role) {
            localStorage.setItem('role', formik.values.role);
            const userRole = localStorage.getItem('role');
            console.log(userRole);
            navigate(`/${formik.values.role}`, { replace: true });
         } else {
            alert("Invalid user role");
         }
      } catch (error) {
         const errorCode = (error as AuthError).code;
         const errorMessage = (error as AuthError).message;
         console.error('Error:', errorCode, errorMessage);
         alert('Sign in failed');
      }
   };

   const formik = useFormik({
      initialValues: {
         role: '',
         email: '',
         password: '',
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
      }),
      onSubmit: handleLogin,
   });

   return (
      <div className={`${style.wrapper}`}>
         <form className={`${style.formwrapper}`} method="post" onSubmit={formik.handleSubmit}>
            <Text {...style.text}>LOGIN HERE</Text>
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
            <Button type="submit" {...style.submitBtn} label={'Login'}/>
         </form>
      </div>

   )
}

const style = {
   wrapper: "flex flex-col gap-[30px] justify-center items-center",
   formwrapper: 'flex flex-col gap-[30px] justify-center items-center',
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
   }
}
export default SignInForm
