import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
   wrapperStyles?: string;
   width?: string;
   height?: string;
   borderRadius?: string;
};

function Image(props: ImageProps) {
   return <img {...props} className={`${props.wrapperStyles} ${props.width} ${props.height}`} />;
}
const borderRadius = {
   "none":"",
   "xs": "rounded",
   "md": "rounded-md",
   "lg": "rounded-lg",
   "full": "rounded-full",
}
export default Image;
