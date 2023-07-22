import React, {FocusEvent} from 'react';
import {Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select'

type SelectProps = {
   id: string;
   name: string;
   labelId: string;
   label: string;
   value: string;
   options: string[];
   onChange?: (event: SelectChangeEvent<string>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};
const BaseSelect = (props: SelectProps) => {
   const {id, name, labelId, label, value, options, onChange, onBlur} = props;

   return (
      <FormControl sx={{width: '100%', height: 50}}>
         <InputLabel id={labelId} className="text-D1">
            {label}
         </InputLabel>
         <Select
            id={id}
            name={name}
            labelId={labelId}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            displayEmpty
         >
            {options.map((option: string) => (
               <MenuItem key={option} value={option}>
                  {option}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};


export default BaseSelect;

