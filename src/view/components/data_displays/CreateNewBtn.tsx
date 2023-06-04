import {Button, Text} from "../../base_components";
import { FiPlusCircle } from "react-icons/fi";
type CreateBtnProps={
   onClick?: () => void
   wrapperStyles?:string;
}
const CreateNewBtn =(props:CreateBtnProps)=>{
   return(
      <section className={`${style.wrapper}`}>
      <Button
         iconLeft={<FiPlusCircle size={50} />}
         label="Create new"
         {...style.button}
         wrapperStyles={props.wrapperStyles}
         onClick={props.onClick}
      />
      </section>
   )
}
const style={
   wrapper:"flex item-end mb-5 mr-[-70%] ",
   button:{
      size:"sm" as "sm",
      theme:"A" as "A",
      wrapperStyles:"pl-16 pr-16",
      wrapperIconStyles:"left-[83%]"
   }
}
export default CreateNewBtn