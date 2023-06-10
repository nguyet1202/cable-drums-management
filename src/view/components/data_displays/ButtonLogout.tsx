import {getAuth, signOut} from "firebase/auth";
import {Button} from "../../base_components";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ButtonLogout =()=>{
   const navigate = useNavigate();

   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         localStorage.removeItem('role');
         localStorage.removeItem('userID');
         await signOut(authInstance);
         navigate(`/signin`, { replace: true });
      } catch (error) {
         console.error('Sign out error:', error);
      }
   };
   return(
      <div className={style.buttonNavigate.divWrapper}>
         <Button onClick={handleSignOut} iconLeft={<FiLogOut size={25}/>}  label={"Logout" } {...style.buttonNavigate.button}/>
      </div>

   )
}
const style={
   wrapper:" bg-B2 h-[100vh] justify-between flex flex-col gap-10 px-16 py-20 ",
   buttonNavigate:{
      divWrapper:"flex flex-col gap-8 pt-5 pb-6",
      button:{
         theme:"logoutBtn" as "logoutBtn",
         size:"base" as "base",
         wrapperStyles: "bg-GB"
      }
   }
}
export default ButtonLogout