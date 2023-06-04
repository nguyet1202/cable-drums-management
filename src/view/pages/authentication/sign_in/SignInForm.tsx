import {Button, Input, Text} from "../../../base_components";
import {auth} from "../../../../configs/FirebaseConfig";
import {signInWithEmailAndPassword, AuthError, UserCredential } from "firebase/auth";
import React, {useState,ChangeEvent} from "react";
import {Select} from "../../../base_components";


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
         <Text {...style.text}>
            LOGIN HERE
         </Text>
         <Select {...style.select}>
            <option value="option1">Choose your role</option>
            <option value="option2">Admin</option>
            <option value="option3">Planner</option>
            <option value="option3">Supply Vendor</option>
            <option value="option3">Project Contractor</option>
         </Select>
         <Input {...style.inputEmail} label={"Enter email"}
                value={email} onChange={handleEmailChange}
         />
         <Input {...style.inputEmail} label={"Password"}
                type={"password"} value={password} onChange={handlePasswordChange}
         />
         <Button type="button" {...style.submitBtn}
                 label={"Login"} onClick={handleLogin}
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