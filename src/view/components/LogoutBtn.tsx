import {Button} from '../base_components'
import {FiLogOut} from "react-icons/fi";

const LogoutBtn = () => {
   return (
      <Button iconLeft={<FiLogOut size={30} className="text-D1 focus:outline-none cursor-pointer"/>} label={''}
              {...style.button.button}
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

