import {DetailedHTMLProps, HTMLAttributes} from "react"
type p = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
type TextProps = p & {
   size?: keyof typeof TextSize
   weight?: keyof typeof TextWeight
   color?:keyof typeof TextColor
   font?:keyof typeof TextFont
   wrapperStyles?:string
}

function Text (props: TextProps) {
   let {
      size,
      weight,
      color,
      font,
      wrapperStyles,
      ...p
   } = props

   return <p
      {...p}
      className={`${style.text} ${TextFont[props.font ?? "A"]} ${TextSize[props.size ?? "base"]} ${TextWeight[props.weight ?? "normal"]} ${TextColor[props.color ?? "black"]} ${props.wrapperStyles}`}
   >
      {props.children}
   </p>
}

const style = {
   text: ""
}

const TextSize = {
   xs: "text-xs",
   sm: "text-sm",
   base: "text-base",
   md: "text-md",
   lg: "text-lg",
   xl: "text-xl",
   "2xl":"text-2xl",
   "3xl":"text-3xl",
   "4xl":"text-4xl",
   "5xl":"text-5xl",
   "6xl":"text-6xl",
}
const TextFont = {
   A:"font-sansA",
   B:"font-sansB",
}


const TextWeight = {
   light: "font-light",
   normal: "font-normal",
   medium: "font-medium",
   bold: "font-bold",
   extrabold: "font-extrabold",
}

const TextColor = {
   blue: "text-B1",
   blue2: "text-B2",
   white: "text-W1",
   white2:"text-W2",
   gray: "text-G",
   gray2: "text-G2",
   black:"text-BB",
   pink:"text-P1",
   pink2:"text-P2"
}

export default Text

export {type TextProps, TextSize, TextWeight,TextColor}