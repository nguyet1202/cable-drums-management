import {Button, Text} from "../index";
import React from "react";
import {useNavigate} from "react-router-dom";

const LoginRequire = () => {
   const navigate = useNavigate();
   const handleLogin = () => {
      navigate(`/signin`, { replace: true });
   };
   return (
      <main className={`${style.wrapper}`}>
         <Text {...style.text}>
            You need to login to access this page
         </Text>
         <div className={`w-1/6`}>
            <Button type="button" {...style.button} label={"Login here"} onClick={handleLogin}/>
         </div>
      </main>
   )
}
const style = {
   wrapper: " bg-B2 h-[100vh] flex justify-center items-center flex-col gap-10 ",
   text: {
      size: "2xl" as "2xl",
      weight: "extrabold" as "extrabold",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "text-center "
   },
   button: {
      size: "sm" as "sm",
      theme: "B" as "B",

   }
}
export default LoginRequire