import {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from "react"
import {Text} from "../data_displays"
import {IconType} from "react-icons";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
   size?: keyof typeof ButtonSize
   theme?: keyof typeof ButtonTheme
   label: string
   type?:string
   iconLeft?: ReactElement<IconType>
   onClick?: () => void
   wrapperStyles?:string;
   wrapperIconStyles?:string;
}

function Button(props: ButtonProps) {
   let size = ButtonSize[props.size ?? "sm"]
   let theme = ButtonTheme[props.theme ?? "primary"]

   return (
      <button onClick={props.onClick} className={`${style.wrapper} ${size.wrapper} ${theme.wrapper} ${props.wrapperStyles}`}type={props.type}>
         <span className={`${style.iconLeft} ${props.wrapperIconStyles}`}>{props.iconLeft}</span>
         <Text
            size={size.text.size}
            weight={size.text.weight}
            color={theme.text.color}
         >
            {props.label}
         </Text>
      </button>
   )
}

const style = {
   wrapper: "relative flex justify-center",
   iconLeft: "absolute left-3 empty:hidden self-center"
}

const ButtonTheme = {
   primary: {
      wrapper: "bg-W rounded text-P rounded-lg shadow-xl",
      text: {
         color:"black" as "black",
         styles:""
      }
   },
   secondary: {
      wrapper:"bg-B1 rounded-lg  shadow-lg",
      text: {
         color:"white" as "white",
         styles:""
      }
   },
   A:{
      wrapper: " rounded text-P rounded-lg",
      text: {
         color:"black" as "black",
         styles:""
      }
   },
   B:{
      wrapper: " bg-P rounded rounded-lg",
      text: {
         color:"white" as "white",
         styles:""
      }
   }
}

const ButtonSize = {
   xs: {
      wrapper: "w-full px-[0px] py-[12px] ",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   sm: {
      wrapper: "w-full px-[50px] py-[12px] ",
      text: {
         size: "xl" as "xl",
         weight: "bold" as "bold"
      },
   },
   base: {
      wrapper: "w-full px-[100px] py-[12px]",
      text: {
         size: "lg" as "lg",
         weight: "normal" as "normal"
      },
   },
   md: {
      wrapper: "w-full px-[50px] py-[12px]",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   lg: {
      wrapper: "w-full px-[50px] py-[10px]",
      text: {
         size: "lg" as "lg",
         weight: "bold" as "bold"
      },
   }
}

export default Button

export {type ButtonProps, ButtonSize, ButtonTheme}