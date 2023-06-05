import {getAuth, signOut} from "firebase/auth";
import {Button} from "../../base_components";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
const ButtonLogout =()=>{
   const navigate = useNavigate();
   const [reloadComponent, setReloadComponent] = useState(false);
   useEffect(() => {
      if (reloadComponent) {
         setReloadComponent(false);
      }
   }, [reloadComponent]);
   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         await signOut(authInstance);
         localStorage.removeItem('role');
         localStorage.removeItem('userID');
         alert('Sign out successful');
         navigate(`/signin`, { replace: true });
         setReloadComponent(true);
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
export default ButtonLogout