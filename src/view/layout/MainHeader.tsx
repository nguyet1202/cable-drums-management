import {Notification, InforUser, LogoutBtn} from "../components";
import {Logo} from '../base_components'

const MainHeader = () => {

   return (
      <main className={style.wrapper}>
         <div className={`flex flex-row items-center gap-16`}>
            <Logo/>
         </div>
         <div className={`flex flex-row items-center justify-end  gap-7 w-[20%] py-[10px] `}>
            <InforUser/>
            <Notification/>
            <LogoutBtn/>
         </div>
      </main>
   )
}

const style = {
   wrapper: "w-full flex flex-row justify-between mb-5 px-20 border-b-[1px] border-b-G2"
}
export default MainHeader