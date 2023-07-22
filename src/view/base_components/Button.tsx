import {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement} from "react"
import Text from './Text'
import {IconType} from "react-icons";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
   size?: keyof typeof ButtonSize
   theme?: keyof typeof ButtonTheme
   label: string
   type?: string
   iconLeft?: ReactElement<IconType>
   onClick?: () => void
   wrapperStyles?: string;
   wrapperIconStyles?: string;
   disabled?: boolean;
}

const Button = (props: ButtonProps) => {
   let size = ButtonSize[props.size ?? "xxs"]
   let theme = ButtonTheme[props.theme ?? "NoneBtn"]

   return (
      <button
         onClick={props.onClick}
         className={`${style.wrapper} ${size.wrapper} ${theme.wrapper} ${props.wrapperStyles}`}
         type={props.type}
         disabled={props.disabled}
      >
         <span className={`${style.iconLeft} ${props.wrapperIconStyles}`}>{props.iconLeft}</span>
         <Text
            size={size.text.size}
            weight={size.text.weight}
            color={theme.text.color}
            wrapperStyles={theme.text.styles}
         >
            {props.label}
         </Text>
      </button>
   )
}

const style = {
   wrapper: "relative flex justify-center items-center",
   iconLeft: "absolute left-3 right-3 empty:hidden self-center"
}

const ButtonTheme = {
   primary: {
      wrapper: "",
      text: {
         color: "gray2" as "gray2",
         styles: ""
      }
   },
   NoneBtn: {
      wrapper: "",
      text: {
         color: "black" as "black",
         styles: ""
      }
   },
   submitBtn: {
      wrapper: "bg-B1 rounded-lg  shadow-lg",
      text: {
         color: "white" as "white",
         styles: ""
      }
   },
   UpdaterRequest: {
      wrapper: "rounded-full  shadow-lg",
      text: {
         color: "white" as "white",
         styles: ""
      }
   },
   NotificationBtn: {
      wrapper: " bg-W2 rounded-xl  shadow-xl",
      text: {
         color: "black" as "black",
         styles: ""
      }
   }
}
const ButtonSize = {
   xxs: {
      wrapper: "px-0 py-0",
      text: {
         size: "sm" as "sm",
         weight: "normal" as "normal"
      },
   },
   xs: {
      wrapper: "px-[20px] py-[5px]",
      text: {
         size: "base" as "base",
         weight: "normal" as "normal"
      },
   },
   sm: {
      wrapper: "px-[30px] py-[10px]",
      text: {
         size: "lg" as "lg",
         weight: "bold" as "bold"
      },
   },
   base: {
      wrapper: "px-[50px] py-[10px]",
      text: {
         size: "lg" as "lg",
         weight: "bold" as "bold"
      },
   },
}
export default Button
