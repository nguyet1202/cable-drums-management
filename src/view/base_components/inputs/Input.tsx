import {Text} from "../data_displays";
import { ChangeEvent, FocusEvent } from 'react';
type InputProps = {
   size?: keyof typeof InputSize
   theme?: keyof typeof InputTheme
   label?: string
   type?:string
   wrapperStyles?:string
   value?: string
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
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
                value={props.value} onChange={props.onChange} onBlur={props.onBlur}
         />
      </label>
   )
}

const style = {
   label: "relative"
}
const InputSize = {
   xs: {
      wrapper: "",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   sm: {
      wrapper: "",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   base: {
      wrapper: "py-2 px-4 w-full",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   md: {
      wrapper: "w-full py-[13px] pl-[15px] pr-[100px] mt-2 ",
      text: {
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
      wrapper:"bg-B2 rounded-lg text-G font-font",
      text: {
         color: "black" as "black",
         styles:"hidden"
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
      wrapper:"border-b-[0.5px] border-G  focus:outline-none focus:border-P",
      text: {
         color: "black" as "black",
         styles:""
      }
   }
}
export default Input
export {type InputProps, InputSize, InputTheme}
