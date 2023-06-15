import React, {useState} from 'react';
import {auth} from '../../../../configs/FirebaseConfig';
import {signInWithEmailAndPassword, AuthError, UserCredential} from 'firebase/auth';
import {ref, get} from 'firebase/database';
import {database} from '../../../../configs/FirebaseConfig';
import {Button, Input,Text} from '../../../base_components';
import {useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {setDataUser} from "../../../../store/slices/userSlice";

function SignInForm() {
   const dispatch = useDispatch();
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

         if (userDataSnapshot.exists()) {
            dispatch(setDataUser(userDataSnapshot.val()));
            navigate(`/${userDataSnapshot.val().role}`, { replace: true });
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
      }),
      onSubmit: handleLogin,
   });

   return (
      <div className={`${style.wrapper}`}>
         <Text {...style.text}> LOGIN HERE!</Text>
         <form className={`${style.formwrapper}`} method="post" onSubmit={formik.handleSubmit}>
            <div className={`flex flex-col gap-3`}>
               <Input
                  id="email"
                  name="email"
                  {...style.inputEmail}
                  wrapperStyles={`border ${formik.touched.email && formik.errors.email ? 'border-P' : 'border-0'}`}
                  label="Email"
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
   formwrapper: 'flex flex-col gap-[30px] justify-center items-center px-[30px] py-[50px] shadow-2xl bg-W1 rounded-lg',
   inputEmail: {
      size: 'md' as 'md',
      wrapperStyles: 'outline-0 ',
   },
   text: {
      size: '2xl' as '2xl',
      weight: 'extrabold' as 'extrabold',
      color: 'black' as 'black',
      font: 'B' as 'B',
      wrapperStyles: 'text-center lg:w-full xl:text-4xl 2xl:text-4xl',
   },
   smalltext:{},
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
