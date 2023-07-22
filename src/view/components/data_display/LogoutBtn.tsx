import {Button} from "../../base_components/data_display";
import { FiLogOut } from "react-icons/fi";
import {getAuth, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {setLoggedIn} from "../../../store/slices/authSlice";
import { useDispatch } from 'react-redux';
const LogoutBtn = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleSignOut = async () => {
      try {
         const authInstance = getAuth();
         dispatch(setLoggedIn(false));
         navigate(`/signin`, { replace: true });
         await signOut(authInstance);
      } catch (error) {
         console.error('Sign out error:', error);
      }
   };
   return (
      <Button iconLeft={<FiLogOut size={30} className="text-D1 focus:outline-none cursor-pointer"/>} label={''}
              onClick={handleSignOut} {...style.button.button}
      />
   )
}
const style = {
   button: {
      button: {
         theme: "NoneBtn" as "NoneBtn",
         size: "base" as "base",
         wrapperStyles: "pr-0"
      }
   }
}

export default LogoutBtn;

