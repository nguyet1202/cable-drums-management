import React from 'react';
import { Text, Select, Input } from '../../base_components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormAuthenProps {
   title: string;
   type?: string;
   role: string;
   email: string;
   password: string;
   onRoleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   // onEmailBlur?: () => void;
   // onPasswordBlur?: () => void;
   // onRoleBlur?: () => void;
   // touched: {
   //    role?: boolean;
   //    email?: boolean;
   //    password?: boolean;
   // };
   // errors: {
   //    role?: string;
   //    email?: string;
   //    password?: string;
   // };
}

const FormAuthen = (props: FormAuthenProps) => {
   return (
      <form className={`${style.wrapper}`}>
         <Text {...style.text}>{props.title}</Text>
         <Select {...style.select} value={props.role} onChange={props.onRoleChange}
                 // onBlur={props.onRoleBlur}
         >
            <option>Choose your role</option>
            <option value="admin">Admin</option>
            <option value="planner">Planner</option>
            <option value="supply_vendor">Supply Vendor</option>
            <option value="project_contractor">Project Contractor</option>
         </Select>
         {/*{props.touched.role && props.errors.role && <Text>{props.errors.role}</Text>}*/}
         <Input
            {...style.inputEmail}
            label="Enter email"
            value={props.email}
            onChange={props.onEmailChange}
            // onBlur={props.onEmailBlur}
         />
         {/*{props.touched.email && props.errors.email && <Text>{props.errors.email}</Text>}*/}
         <Input
            {...style.inputEmail}
            label="Password"
            type={props.type}
            value={props.password}
            onChange={props.onPasswordChange}
            // onBlur={props.onPasswordBlur}
         />
         {/*{props.touched.password && props.errors.password && <Text>{props.errors.password}</Text>}*/}
      </form>
   );
};

const style = {
   wrapper: 'flex flex-col gap-[30px] justify-center items-center',
   inputEmail: {
      size: 'md' as 'md',
      wrapperStyles: 'sm:py-[20px] sm:pr-[170px] lg:pr-[120px] 2xl:pr-[160px]',
   },
   select: {
      selectSize: 'md' as 'md',
      theme: 'primary' as 'primary',
      wrapperStyles: 'border-0 border-B1',
   },
   text: {
      size: '2xl' as '2xl',
      weight: 'extrabold' as 'extrabold',
      color: 'pink' as 'pink',
      font: 'B' as 'B',
      wrapperStyles: 'text-center lg:w-full xl:text-4xl 2xl:text-4xl',
   },
};

export default FormAuthen;
