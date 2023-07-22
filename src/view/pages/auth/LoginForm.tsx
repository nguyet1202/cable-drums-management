import {auth} from "../../../configs/firebaseConfig";
import {signInWithEmailAndPassword, AuthError, UserCredential} from 'firebase/auth';
import {ref, get} from 'firebase/database';
import {database} from "../../../configs/firebaseConfig";
import {Button, Text} from "../../base_components/data_display";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {setDataUser} from "../../../store/slices/userSlice";
import {setLoggedIn, setLoading} from "../../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {PasswordField} from "../../components/data_display";
import {TextField,} from '@mui/material';

function LoginForm() {

   const navigate = useNavigate();

   const dispatch = useDispatch();
   const handleLogin = async () => {
      try {
         dispatch(setLoading(true));
         const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            formik.values.email,
            formik.values.password
         );
         const user = userCredential.user;
         localStorage.setItem('ID', user.uid);
         const userDataSnapshot = await get(ref(database, `users/${user.uid}`));
         if (userDataSnapshot.exists()) {
            navigate(`/${userDataSnapshot.val().role}`, {replace: true});
            dispatch(setDataUser(userDataSnapshot.val()));
            dispatch(setLoggedIn(true));
            dispatch(setLoading(false));
         } else {
            formik.setErrors({email: 'Invalid email', password: 'Invalid password'});
         }
      } catch (error) {
         const errorCode = (error as AuthError).code;
         if (errorCode === 'auth/wrong-password') {
            formik.setErrors({password: 'Invalid password'});
         } else {
            formik.setErrors({email: 'Invalid email'});
         }
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
            .required('This is a required field')
      }),
      onSubmit: handleLogin,
   });

   return (
      <div className={`${style.wrapper}`}>
         <Text {...style.text}> LOGIN HERE!</Text>
         <form className={`${style.formwrapper}`} method="post" onSubmit={formik.handleSubmit}>
            <div className={`flex flex-col gap-3 w-[350px]`}>
               <TextField
                  margin="normal"
                  variant="standard"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
               />
               {formik.touched.email && formik.errors.email && (
                  <Text {...style.textError}>{formik.errors.email}</Text>
               )}
            </div>
            <div className={`flex flex-col gap-3 w-[350px]`}>
               <PasswordField value={formik.values.password}
                              id="password"
                              label="password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
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
      wrapperStyles: 'w-[400px]',
   },
   text: {
      size: '2xl' as '2xl',
      weight: 'extrabold' as 'extrabold',
      color: 'black' as 'black',
      font: 'B' as 'B',
      wrapperStyles: 'text-center lg:w-full xl:text-4xl 2xl:text-4xl',
   },
   smalltext: {},
   submitBtn: {
      size: "base" as "base",
      theme: "submitBtn" as "submitBtn",
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
export default LoginForm
