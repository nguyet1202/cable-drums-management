import { TextField} from '@mui/material';
import React, { ChangeEvent, FocusEvent} from 'react';

interface InputMUIProps {
   value?: string | number;
   id?: string;
   label: string;
   styles?:string;
   type?:string;
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const InputMUI = (props: InputMUIProps) => {

   return (
      <TextField
         margin="normal"
         variant="standard"
         id={props.id}
         label={props.label}
         type={props.type}
         fullWidth
         value={props.value}
         className={props.styles}
         onChange={props.onChange}
         onBlur={props.onBlur}
         required
      />
   );
};

export default InputMUI;
