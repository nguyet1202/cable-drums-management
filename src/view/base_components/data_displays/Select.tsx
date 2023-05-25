import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, SelectHTMLAttributes } from "react";

type SelectProps = DetailedHTMLProps<
   SelectHTMLAttributes<HTMLSelectElement>,
   HTMLSelectElement
> & {
   selectSize?: keyof typeof SelectSize;
   theme?: keyof typeof SelectTheme;
   wrapperStyles?: string;
};

function Select(props: SelectProps) {
   const { selectSize ,theme,wrapperStyles, ...s } = props;

   const Size = SelectSize[props.selectSize ?? "sm"];
   const Theme = SelectTheme[props.theme ?? "primary"];

   return (
      <select
         {...s}
         className={`${style.select} ${Size.wrapper} ${Theme.wrapper} ${props.wrapperStyles}`}
      >
         {props.children}
      </select>
   );
}

const style = {
   select: "",
};

const SelectTheme = {
   primary: {
      wrapper: "",
   },
   secondary: {
      wrapper: "bg-B1 rounded-lg shadow-lg",
   },
};

const SelectSize = {
   xs: {
      wrapper: "",
   },
   sm: {
      wrapper: "w-full px-[50px] py-[12px]",
   },
   base: {
      wrapper: "",
   },
   md: {
      wrapper: "w-full px-[50px] py-[12px]",
   },
   lg: {
      wrapper: "w-full px-[50px] py-[10px]",
   },
};

export default Select;
