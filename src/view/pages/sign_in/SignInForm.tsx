import {Button, Input, Text} from "../../base_components";
import {DiApple,DiChrome} from "react-icons/di";
import React from "react";

type SignInFormProps =
   {}

function SignInForm(props: SignInFormProps) {
   return (
      <form className={`${style.wrapper}`}>
         <Text
            size={style.text.size}
            weight={style.text.weight}
            color={style.text.color}
            font={style.text.font}
            wrapperStyles={style.text.wrapperStyles}
         >
            LOGIN HERE
         </Text>
         <Input size={style.inputEmail.size} label={"Enter email"} wrapperStyles={style.inputEmail.wrapperStyles}/>
         <Input size={style.inputEmail.size} label={"Password"} wrapperStyles={style.inputEmail.wrapperStyles} type={"password"}/>
         <Button size={style.submitBtn.size} theme={style.submitBtn.theme} label={"Login"} wrapperStyles={style.submitBtn.wrapperStyles}/>
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