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
      size:"6xl" as "6xl",
      weight:"extrabold" as "extrabold",
      color:"pink" as "pink",
      font:"A" as "A",
      wrapperStyles:"w-full "
   },
   smalltext:{
      size:"3xl" as "3xl",
      weight:"normal" as "normal",
      color:"black" as "black",
      font:"A" as "A",
      wrapperStyles:" "
   }

}
export default SignInText
