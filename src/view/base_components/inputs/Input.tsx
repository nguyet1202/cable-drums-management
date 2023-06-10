import {Text} from "../data_displays";
import { ChangeEvent, FocusEvent } from 'react';
type InputProps = {
   size?: keyof typeof InputSize
   theme?: keyof typeof InputTheme
   label?: string
   type?:string
   wrapperStyles?:string
   value?: string
   name?:string
   defauvalue?:string
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
   id?:string
}

function Input(props: InputProps) {
   let size = InputSize[props.size ?? "base"]
   let theme = InputTheme[props.theme ?? "primary"]
   return (
      <label className={`${style.label}`}>
         <Text
            wrapperStyles={theme.text.styles}
            size={size.text.size}
            weight={size.text.weight}
            color={theme.text.color}
         >
            {props.label}
         </Text>
         <input className={`${size.wrapper} ${theme.wrapper} ${props.wrapperStyles}`}
                placeholder={props.label} type={props.type}
                value={props.value} defaultValue={props.defauvalue} onChange={props.onChange} onBlur={props.onBlur}
                id={props.id}
         />
      </label>
   )
}

const style = {
   label: "relative focus:outline-none"
}
const InputSize = {
   base: {
      wrapper: "py-2 px-4 w-full",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   md: {
      wrapper: "w-[400px] py-[18px] px-[30px] mt-2 focus:outline-none  ",
      text: {
         color:"pink" as "pink",
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   lg: {
      wrapper: "",
      text: {
         size: "lg" as "lg",
         weight: "bold" as "bold"
      },
   }
}
const InputTheme = {
   primary:{
      wrapper:"bg-W rounded-lg font-font border-G border-[1px]",
      text: {
         color: "pink" as "pink",
         styles:"hidden",
         weight:"bold" as "bold"
      }
   },
   secondary:{
      wrapper:"",
      text: {
         color: "black" as "black",
         styles:"absolute right-0 left-3 top-1/2 transform -translate-y-1/3"
      }
   },
   formInput:{
      wrapper:"border-b-[1px] border-G  focus:outline-none focus:border-B1",
      text: {
         color: "black" as "black",
         styles:""
      }
   }
}
export default Input
export {type InputProps, InputSize, InputTheme}
