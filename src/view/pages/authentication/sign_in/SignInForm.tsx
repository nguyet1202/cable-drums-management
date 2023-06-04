import {useId, useState} from 'react';
import { auth } from '../../../../configs/FirebaseConfig';
import { signInWithEmailAndPassword, AuthError, UserCredential } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { database } from '../../../../configs/FirebaseConfig';
import { Button} from '../../../base_components';
import { useNavigate } from "react-router-dom";
import {FormAuthen} from "../../../components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
function SignInForm() {
   const [email, setEmail]= useState<string>('')
   const [password, setPassword]= useState<string>('')
   const [role, setRole] = useState<string>('');
   const navigate = useNavigate();
   const handleLogin = async () => {
      try {
         if (!email || !password) {
            throw new Error("Please enter your email and password to log in");
         }
         const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         localStorage.setItem('userID', user.uid);
         const userDataSnapshot = await get(ref(database, `users/${user.uid}`));
         const userData = userDataSnapshot.val();
         if (userData && userData.role === role) {
            localStorage.setItem('role', role);
            navigate(`/${role}`, { replace: true });
         } else {
            throw new Error("Invalid user role");
         }
      } catch (error) {
         const errorCode = (error as AuthError).code;
         const errorMessage = (error as AuthError).message;
         console.error('Error:', errorCode, errorMessage);
      }
   };
   // const validationSchema = Yup.object().shape({
   //    role: Yup.string().required('Please choose your role'),
   //    email: Yup.string().email('Invalid email').required('Please enter your email'),
   //    password: Yup.string().required('Please enter your password'),
   // });
   //
   // const formik = useFormik({
   //    initialValues: {
   //       role: role,
   //       email: email,
   //       password: password,
   //    },
   //    validationSchema,
   //    onSubmit: handleLogin,
   // });
   // const handleEmailBlur = () => {
   //    formik.setFieldTouched('email', true);
   // };
   // const handlePasswordBlur = () => {
   //    formik.setFieldTouched('password', true);
   // };
   // const handleRoleBlur = () => {
   //    formik.setFieldTouched('role', true);
   // };
   return (
      <div className={`${style.wrapper}`}>
         <FormAuthen
            title={'LOGIN HERE'}
            role={role}
            email={email}
            password={password}
            type={"password"}
            onRoleChange={(event) => setRole(event.target.value)}
            onEmailChange={(event) => setEmail(event.target.value)}
            onPasswordChange={(event) => setPassword(event.target.value)}
            // errors={formik.errors}
            // touched={formik.touched}
            // onEmailBlur={handleEmailBlur}
            // onPasswordBlur={handlePasswordBlur}
            // onRoleBlur={handleRoleBlur}
         />
         <Button type="button" {...style.submitBtn} label={'Login'} onClick={handleLogin} />
      </div>
   )
}

const style = {
   wrapper: "flex flex-col gap-[30px] justify-center items-center",

   inputEmail: {
      size: "md" as "md",
      wrapperStyles:"sm:py-[20px] "
   },

   submitBtn: {
      size: "lg" as "lg",
      theme: "secondary" as "secondary",
      wrapperStyles:"w-full text-center xs:px-[17px] sm:px-[40px] sm:py-[15px] md:px-[20px] lg:px-[15px] 2xl:px-[50px]"
   },
   select: {
      selectSize:"md" as "md",
      theme: "primary" as "primary",
      wrapperStyles:"border-0 border-B1"
   },
   text:{
      size:"2xl" as "2xl",
      weight:"extrabold" as "extrabold",
      color:"pink" as "pink",
      font:"B" as "B",
      wrapperStyles:"text-center lg:w-full xl:text-4xl 2xl:text-4xl"
   },
}
export default SignInForm
