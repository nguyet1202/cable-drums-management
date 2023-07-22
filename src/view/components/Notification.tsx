import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {BiBell} from 'react-icons/bi';

const Notification = () => {

   return (
      <Box sx={{color: 'action.active'}}>
         <Badge color="secondary" variant="dot" className="hover:bg-gray-200">
            <BiBell
               size={30}
               className="text-D1 focus:outline-none cursor-pointer"
            />
         </Badge>
      </Box>
   );
};
export default Notification;

