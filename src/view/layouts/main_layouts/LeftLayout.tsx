import {Button} from "../../base_components";
import { CiCreditCard2,CiViewList } from "react-icons/ci";
import {ButtonLogout} from "../../components";
type LeftLayoutrProps ={
}
const LeftLayout=(props:LeftLayoutrProps)=>{
   return(
      <section className={`${style.wrapper}`} >
         <div>Hello User</div>
         <div className={`flex flex-col gap-8 pt-10 pb-96`}>
         <Button iconLeft={<CiCreditCard2 size={40}/>} size={"md"} label={"Contract"}/>
         <Button iconLeft={<CiViewList size={40}/>} size={"md"} label={"Request"}/>
         </div>
         <ButtonLogout/>
      </section>
   )
}
const style={
   wrapper:"w-1/6 justify-between flex flex-col gap-10 px-10 py-10 "
}
export default LeftLayout