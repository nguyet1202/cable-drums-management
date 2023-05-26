import React from "react";
import {Text} from "../../../base_components";
const SignInText = () => {
   return (
      <div className={`${style.wrapper}`}>
         <Text
            size={style.bigtext.size}
            weight={style.bigtext.weight}
            color={style.bigtext.color}
            font={style.bigtext.font}
            wrapperStyles={style.bigtext.wrapperStyles}
         >
            WELCOME BACK!
         </Text>
         <Text
            size={style.smalltext.size}
            weight={style.smalltext.weight}
            color={style.smalltext.color}
            font={style.smalltext.font}
            wrapperStyles={style.smalltext.wrapperStyles}
         >
            Let's log in to work
         </Text>
      </div>
   );
};
const style = {
   wrapper: "flex flex-col justify-center items-center gap-5",
   bigtext:{
      size:"4xl" as "4xl",
      weight:"extrabold" as "extrabold",
      color:"pink" as "pink",
      font:"A" as "A",
      wrapperStyles:"lg:w-full xl:text-4xl 2xl:text-5xl"
   },
   smalltext:{
      size:"lg" as "lg",
      weight:"normal" as "normal",
      color:"black" as "black",
      font:"A" as "A",
      wrapperStyles:"xl:text-xl 2xl:text-2xl "
   }

}
export default SignInText
