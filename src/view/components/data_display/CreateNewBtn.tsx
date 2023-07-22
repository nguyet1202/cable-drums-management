import {Button} from "../../base_components";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import {openModal} from "../../../store/slices/modalSlice";
type CreateBtnProps={
   wrapperStyles?:string;
}
const CreateNewBtn =(props:CreateBtnProps)=>{
   const dispatch = useDispatch();
   const handleOpenModal = () => {
      dispatch(openModal(true));
   };
   return(
      <section className={`${style.wrapper}`}>
         <Button
            iconLeft={<AiFillPlusCircle size={50} />}
            label="Create new"
            {...style.button}
            wrapperStyles={props.wrapperStyles}
            onClick={ handleOpenModal}
         />
      </section>
   )
}
const style={
   wrapper:"flex item-end mb-5 justify-start text-W1 px-5",
   button:{
      size:"sm" as "sm",
      theme:"primary" as "primary",
      wrapperStyles:"pl-16 pr-0",
      wrapperIconStyles:"left-[-15%]"
   }
}
export default CreateNewBtn