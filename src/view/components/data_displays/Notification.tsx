import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { BiBell } from "react-icons/bi";

const Notification=()=> {
   return (
      <Box sx={{ color: 'action.active' }}>
         <Badge color="secondary" variant="dot">
            <BiBell size={30} className={`text-B1`} />
         </Badge>
      </Box>
   );
}
export default Notification