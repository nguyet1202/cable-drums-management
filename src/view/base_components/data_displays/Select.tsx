import {ChangeEvent,FocusEvent, DetailedHTMLProps, SelectHTMLAttributes} from "react";

type SelectProps = DetailedHTMLProps<
   SelectHTMLAttributes<HTMLSelectElement>,
   HTMLSelectElement
> & {
   selectSize?: keyof typeof SelectSize;
   theme?: keyof typeof SelectTheme;
   wrapperStyles?: string;
   onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
   onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

function Select(props: SelectProps) {
   const { selectSize ,theme,wrapperStyles, ...s } = props;

   const Size = SelectSize[props.selectSize ?? "sm"];
   const Theme = SelectTheme[props.theme ?? "primary"];

   return (
      <select
         {...s}
         className={`${style.select} ${Size.wrapper} ${Theme.wrapper} ${props.wrapperStyles}`}
         onChange={props.onChange} onBlur={props.onBlur}
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
   requestform:{
      wrapper:"border-b-[1px] border-G py-2 px-4 w-full focus:outline-none focus:border-B1"
   }
};

const SelectSize = {
   xs: {
      wrapper: "w-full px-[5px] py-[12px]",
   },
   sm: {
      wrapper: "w-full px-[30px] py-[12px]",
   },
   md: {
      wrapper: " w-[400px] py-[18px] px-[30px]",
   },
   lg: {
      wrapper: "w-full px-[50px] py-[10px]",
   },
};

export default Select;
