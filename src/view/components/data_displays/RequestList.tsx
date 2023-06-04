import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {Button, Select, Text} from "../../base_components";
import {RequestData} from "../../../store/slices/requestSlice";
import {FaPen} from "react-icons/fa";
import React, {useState} from "react";
import {useSelector} from "react-redux";

type RequestListProps = {
   // data: { [key: string]: RequestData };
   handleOpenModal: (item: RequestData) => void;
};

const RequestList = (props: RequestListProps) => {
   const data = useSelector((state: { request:
         { data: { [key: string]: RequestData }} }) => state.request.data);
   const [role, setRole] = useState<string>('');
   const [showSelection, setShowSelection] = useState<boolean>(false);
   const Iconhandle = (requestID:string) => {
      setShowSelection(true)

   }
   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow className="bg-G shadow-md">
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Request ID</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Contract ID</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Quantity</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Supply Team ID</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Contractor Team ID</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Status</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Update Status</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>See more detail</Text>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {Object.keys(data).length > 0 ? (
                  Object.keys(data).map((requestID) => (
                     <TableRow key={requestID}>
                        <TableCell component="th" scope="row" align={`center`}>
                           {requestID}
                        </TableCell>
                        <TableCell align={`center`}>
                           {data[requestID].contract_id}
                        </TableCell>
                        <TableCell align={`center`}>{data[requestID].amount}</TableCell>
                        <TableCell align={'center'}>{data[requestID].project_contractor_id}</TableCell>
                        <TableCell align={'center'}>{data[requestID].supply_vendor_id}</TableCell>
                        <TableCell align={'center'}>
                           {showSelection ? (
                              <Select {...style.select} value={role} onChange={(event) => setRole(event.target.value)}>
                                 <option>Status</option>
                                 <option value="admin">New</option>
                                 <option value="planner">Ready to Collect</option>
                                 <option value="supply_vendor">Collected</option>
                              </Select>
                           ) : (
                              <Text color={"black"} weight={'bold'}>{data[requestID].status}</Text>
                           )}
                        </TableCell>
                        <TableCell align={'center'}>
                           <Button {...style.button} label={""} iconLeft={<FaPen size={25}/>}
                                   onClick={() => Iconhandle(requestID)}/>
                        </TableCell>
                        <TableCell align={'center'}>
                           <Button label={"See more"} size={"xs"} theme={`B`} wrapperStyles={"w-1/2 ml-[30%]"}
                                   onClick={() => (props.handleOpenModal)(data[requestID])}/>
                        </TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={8} align="center">
                        No data available
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );
};
const style = {
   button: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: "w-1/2 ml-[30%] py-5]"
   },
   select: {
      selectSize: 'xs' as 'xs',
      theme: 'primary' as 'primary',
      wrapperStyles: 'border-0 border-B1',
   },
}

export default RequestList;
