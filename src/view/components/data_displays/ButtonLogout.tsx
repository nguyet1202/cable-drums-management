import {getAuth, signOut} from "firebase/auth";
import {Button} from "../../base_components";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ButtonLogout =()=>{
   const navigate = useNavigate();
   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         await signOut(authInstance);
         navigate(`/signin`, { replace: true });
         console.log('Sign out successful');
      } catch (error) {
         console.error('Sign out error:', error);
      }
   };
   return(
      <div>
         <Button onClick={handleSignOut} iconLeft={<FiLogOut size={25}/>} size={"base"} label={"Logout" }/>
      </div>

   )
}
export default ButtonLogout