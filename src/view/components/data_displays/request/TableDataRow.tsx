import React from 'react';
import { TableRow, TableCell } from "@mui/material";
import { Text, Select, Button } from "../../../base_components";
import { RequestData } from "../../../../store/slices/requestSlice";
import { FaPen } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";

type TableDataRowProps = {
   request: RequestData;
   selected: boolean;
   handleSelectRow: (requestID: string) => void;
   updateRequestStatus: (requestID: string) => void;
   status: string;
   onChangeVendor?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange with correct casing
   onchangeContract?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   onClickUpdateRequest?: () => void;
   onClickOpenSelect?: () => void;
   onClickSeemore?: () => void;
};

const TableDataRow = (props: TableDataRowProps) => {
   const userRole = localStorage.getItem('role');
   console.log(userRole)
   return (
      <TableRow key={props.request.id}>
         <TableCell component="th" scope="row" align="center">
            {props.request.id}
         </TableCell>
         <TableCell align="center">{props.request.contract_id}</TableCell>
         <TableCell align="center">{props.request.amount}</TableCell>
         <TableCell align="center">{props.request.supply_vendor_id}</TableCell>
         <TableCell align="center">{props.request.project_contractor_id}</TableCell>
         <TableCell align="center">
            {userRole === "planner" ? (
               <Text color="black" weight="bold">{props.request.status}</Text>
            ) : userRole === "supply_vendor" && props.selected ? (
               <Select
                  selectSize="xs"
                  theme="primary"
                  wrapperStyles="border-0 border-B1"
                  value={props.status}
                  onChange={props.onChangeVendor}
               >
                  <option >Status</option>
                  <option value="ready_collect">Ready to Collect</option>
               </Select>
            ) : userRole === "project_contractor" && props.selected ? (
               <Select
                  selectSize="xs"
                  theme="primary"
                  wrapperStyles="border-0 border-B1"
                  value={props.status}
                  onChange={props.onchangeContract}
               >
                  <option >Status</option>
                  <option value="collected">Collected</option>
               </Select>
            ) : (
               <Text color="black" weight="bold">{props.request.status}</Text>
            )}
         </TableCell>
         {userRole !== "planner" && (
            <TableCell align="center">
               {props.selected ? (
                  <Button
                     size="xs"
                     theme="A"
                     wrapperStyles="w-1/2 ml-[30%] py-5]"
                     label=""
                     iconLeft={<BsFillCheckCircleFill size={50} color="green" />}
                     onClick={props.onClickUpdateRequest}
                     wrapperIconStyles="shadow-2xl"
                  />
               ) : (
                  <Button
                     size="xs"
                     theme="A"
                     wrapperStyles="w-1/2 ml-[30%] py-5]"
                     label=""
                     iconLeft={<FaPen size={25} />}
                     onClick={props.onClickOpenSelect}
                  />
               )}
            </TableCell>
         )}
         <TableCell align="center">
            <Button
               label="See more"
               size="xs"
               theme="B"
               wrapperStyles="w-1/2 ml-[30%]"
               onClick={props.onClickSeemore}
            />
         </TableCell>
      </TableRow>
   );
};

export default TableDataRow;
