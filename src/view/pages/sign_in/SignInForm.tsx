import {Button, Input, Text} from "../../base_components";
import {auth} from "../../../configs/FirebaseConfig";
import {signInWithEmailAndPassword, AuthError, UserCredential } from "firebase/auth";
import React, {useState} from "react";
import  { ChangeEvent } from 'react';



function SignInForm() {
   const [email, setEmail]= useState<string>('')
   const [password, setPassword]= useState<string>('')
   console.log(email)
   const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
   };
   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
   };
   const handleLogin = async () => {
      try {
         if (!email || !password) {
            throw new Error("Please enter your email and password to log in");
         }
         const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         console.log('Success!', user);
      } catch (error) {
         const errorCode = (error as AuthError).code;
         const errorMessage = (error as AuthError).message;
         console.error('Error:', errorCode, errorMessage);
      }
   };

   return (
      <form className={`${style.wrapper}`} >
         <Text
            size={style.text.size}
            weight={style.text.weight}
            color={style.text.color}
            font={style.text.font}
            wrapperStyles={style.text.wrapperStyles}
         >
            LOGIN HERE
         </Text>
         <Input size={style.inputEmail.size} label={"Enter email"}
                wrapperStyles={style.inputEmail.wrapperStyles}
                value={email} onChange={handleEmailChange}
         />
         <Input size={style.inputEmail.size} label={"Password"}
                wrapperStyles={style.inputEmail.wrapperStyles}
                type={"password"} value={password} onChange={handlePasswordChange}
         />
         <Button type="button" size={style.submitBtn.size} theme={style.submitBtn.theme}
                 label={"Login"} wrapperStyles={style.submitBtn.wrapperStyles}
                 onClick={handleLogin}
         />
      </form>
   )
}

const style = {
   wrapper: "flex flex-col gap-[30px] justify-center items-center",

   inputEmail: {
      size: "md" as "md",
      wrapperStyles:"sm:py-[20px] sm:pr-[170px] lg:pr-[120px] 2xl:pr-[160px]"
   },

   submitBtn: {
      size: "lg" as "lg",
      theme: "secondary" as "secondary",
      wrapperStyles:"w-full text-center xs:px-[17px] sm:px-[40px] sm:py-[15px] md:px-[20px] lg:px-[15px] 2xl:px-[50px]"
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