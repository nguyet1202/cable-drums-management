import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import  {useState, ChangeEvent, FocusEvent} from 'react';

interface PasswordFieldProps {
   value?: string;
   id?: string;
   label?: string;
   styles?: string;
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const PasswordField = (props: PasswordFieldProps) => {
   const [showPassword, setShowPassword] = useState(false);

   const handleClick = () => {
      setShowPassword(!showPassword);
   };

   const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
   };

   return (
      <TextField
         margin="normal"
         variant="standard"
         id={props.id}
         label={props.label}
         type={showPassword ? 'text' : 'password'}
         fullWidth
         value={props.value}
         className={props.styles}
         onChange={props.onChange}
         onBlur={props.onBlur}
         required
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                     {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
               </InputAdornment>
            ),
         }}
      />
   );
};

export default PasswordField;
