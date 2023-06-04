import {Button, Input, Select, Text} from "../../base_components";
import React from "react";

type RequestData = {
   contract_id: string;
   project_contractor_id: string;
   amount: number;
   supply_vendor_id: string;
   contract_idOnchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   project_contractor_idOnchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   amountOnchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   supply_vendor_idOnchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const CreateRequestForm = (props: RequestData) => {
   return (
      <div >
         <Text {...style.formtitle}> Request For Withdraw Cable Drum</Text>
         <div className={style.formcontent}>
            <div className="w-1/2 pr-40">
               <div className="mb-6">
                  <Text {...style.textfield}>Quantity</Text>
                  <Input
                     type="number"
                     value={String(props.amount)} // Convert amount to a string
                     onChange={props.amountOnchange} // Convert the input value back to a number
                     {...style.input}
                  />

               </div>
               <div className="mb-6">
                  <Text {...style.textfield}>Contract ID</Text>
                  <Select theme={'requestform'} value={props.contract_id}
                          onChange={props.contract_idOnchange} {...style.select}
                  >
                     <option></option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </Select>
               </div>
            </div>
            <div className="w-1/2">
               <div className={`flex flex-row gap-10`}>
                  <div className="mb-6">
                     <Text {...style.textfield}>Supply Team ID</Text>
                     <Select theme={'requestform'} value={props.supply_vendor_id}
                             onChange={props.supply_vendor_idOnchange} {...style.select}
                     >
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                     </Select>
                  </div>
                  <div className="mb-6">
                     <Text {...style.textfield}>Contractor Team ID</Text>
                     <Select theme={'requestform'} value={props.project_contractor_id}
                             onChange={props.project_contractor_idOnchange} {...style.select}>
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                     </Select>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
const style = {
   wrapper: "flex justify-center items-center h-screen",
   formtitle: {
      wrapperStyles: "mb-24",
      weight: "bold" as "bold",
      size: "3xl" as "3xl",
      color: "pink" as "pink",
   },
   formcontent: "flex flex-row gap-20",
   textfield: {
      wrapperStyles: "mb-2 ",
      size: "sm" as "sm",
   },
   input: {
      size: "base" as "base",
      theme: "formInput" as "formInput",
      wrapperStyles:"bg-P3"
   },
   select:{
      wrapperStyles:"bg-P3"
   }

}
export default CreateRequestForm