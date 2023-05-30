import {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from "react";

type SelectProps = DetailedHTMLProps<
   SelectHTMLAttributes<HTMLSelectElement>,
   HTMLSelectElement
> & {
   selectSize?: keyof typeof SelectSize;
   theme?: keyof typeof SelectTheme;
   wrapperStyles?: string;
   onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function Select(props: SelectProps) {
   const { selectSize ,theme,wrapperStyles, ...s } = props;

   const Size = SelectSize[props.selectSize ?? "sm"];
   const Theme = SelectTheme[props.theme ?? "primary"];

   return (
      <select
         {...s}
         className={`${style.select} ${Size.wrapper} ${Theme.wrapper} ${props.wrapperStyles}`}
         onChange={props.onChange}
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
      wrapper: "bg-W2 focus:outline-none focus:border-sky-500 rounded-lg text-lg font-font font-semibold text-BB shadow-xl",
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
