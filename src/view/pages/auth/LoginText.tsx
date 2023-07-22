import React from "react";
import {Text} from "../../base_components/data_display";

const LoginText = () => {
   return (
      <div className={`${style.wrapper}`}>
         <Text
            {...style.bigtext}
         >
            WELCOME BACK!
         </Text>
         <Text
            {...style.smalltext}
         >
            Let's log in to work
         </Text>
      </div>
   );
};
const style = {
   wrapper: "flex flex-col justify-center items-center gap-5",
   bigtext: {
      size: "6xl" as "6xl",
      weight: "extrabold" as "extrabold",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "w-full "
   },
   smalltext: {
      size: "3xl" as "3xl",
      weight: "normal" as "normal",
      color: "black" as "black",
      font: "A" as "A",
      wrapperStyles: " "
   }

}
export default LoginText
