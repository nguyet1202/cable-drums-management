import {InforUser} from "../components";
import {Notification} from "../components";
const Header=()=>{
   return(
      <main className={style.wrapper}>
         <InforUser/>
         <Notification/>
      </main>

   )
}
const style={
   wrapper:"flex flex-row justify-between w-full mt-5 mb-5 px-20 border-b-[1px] border-b-B2"
}
export default Header