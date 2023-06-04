import {Button, Image} from "../../base_components";
import {Text} from "../../base_components";
import { FiUsers } from "react-icons/fi";
import {ButtonLogout} from "../../components";
import React from "react";
import { useNavigate } from "react-router-dom";

const ContractorLeftSideBar=()=>{
   const navigate = useNavigate();

   const HandleClick =()=>{
      navigate(`/contractor-request`, { replace: true });
   }
   return(
      <section className={`${style.wrapper}`} >
         <Text {...style.text}>
            WELCOME BACK
         </Text>
         <div className={`${style.buttonNavigate.divWrapper}`}>
            <Button iconLeft={<FiUsers size={25}/>} label={"Request"} onClick={HandleClick}
                    {...style.buttonNavigate.button}
            />
            <ButtonLogout/>

         </div>
         <Image src="./images/loginImage.png" alt="login image" width={"w-[300px]"} />
      </section>
   )
}
const style={
   wrapper:" bg-B2 h-[100vh] justify-between flex flex-col gap-10 px-16 py-20 ",
   text:{
      size:"2xl" as "2xl",
      weight:"extrabold" as "extrabold",
      color:"pink" as "pink",
      font:"A" as "A",
      wrapperStyles:"text-center"
   },
   buttonNavigate:{
      divWrapper:"flex flex-col gap-8 pt-5 pb-6",
      button:{
         size:"base" as "base",
      }
   }
}
export default ContractorLeftSideBar