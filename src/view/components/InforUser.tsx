import React from "react";
import Avatar from '@mui/material/Avatar';
import {deepOrange} from '@mui/material/colors';
import {Button} from '../base_components'

const InforUser = () => {
   return (
      <div className={`flex flex-row justify-end gap-3 items-center`}>
         {/*<Avatar sx={{ bgcolor: deepOrange[500] }}>{data.split(' ')[0][0]}{data.split(' ')[2][0]}</Avatar>*/}
         <Avatar sx={{bgcolor: deepOrange[500]}}>AD</Avatar>
         <Button label={"Ho Thi Nguyet"}
                 {...style.button.button}
         />
      </div>
   )
}
const style = {
   button: {
      button: {
         theme: "NoneBtn" as "NoneBtn",
         size: "base" as "base",
         wrapperStyles: "pl-0 pr-0 w-[90%]"
      }
   }
}
export default InforUser