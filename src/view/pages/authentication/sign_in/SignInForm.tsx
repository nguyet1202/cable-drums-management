import {Button, Input, Text,Select} from "../../../base_components";
import {auth} from "../../../../configs/FirebaseConfig";
import {signInWithEmailAndPassword, AuthError, UserCredential } from "firebase/auth";
import React, {useState} from "react";
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from "react-router-dom";
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
         const database = getDatabase();
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

   return (
      <form className={`${style.wrapper}`} >
         <Text {...style.text}>
            LOGIN HERE
         </Text>
         <Select {...style.select} value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">Choose your role</option>
            <option value="admin">Admin</option>
            <option value="planner">Planner</option>
            <option value="supply_vendor">Supply Vendor</option>
            <option value="project_contractor">Project Contractor</option>
         </Select>
         <Input {...style.inputEmail} label={"Enter email"}
                value={email}  onChange={(event) => setEmail(event.target.value)}
         />
         <Input {...style.inputEmail} label={"Password"}
                type={"password"} value={password}  onChange={(event) => setPassword(event.target.value)}
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
