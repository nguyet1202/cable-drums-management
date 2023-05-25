import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
   wrapperStyles?: string;
   width?: string;
   height?: string;
   borderRadius?: keyof typeof BorderRadius;
};

function Image(props: ImageProps) {
   let {
      width,
      height,
      borderRadius,
      wrapperStyles,
      ...image
   } = props
   return <img {...image} className={`${props.wrapperStyles} ${props.width} ${props.height} ${BorderRadius[props.borderRadius ?? "none"]}`} />;
}
const BorderRadius = {
   none:"rounded-none",
   xs: "rounded",
   md: "rounded-md",
   lg: "rounded-lg",
   full: "rounded-full",
}
export default Image;
