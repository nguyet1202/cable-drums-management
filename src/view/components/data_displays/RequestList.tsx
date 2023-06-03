import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {Button, Text} from "../../base_components";
import {RequestData} from "../../pages/planner_team/Request";

type RequestListProps = {
   data: { [key: string]: RequestData };
   handleOpenModal: (item: RequestData) => void;
};

const RequestList = (props:RequestListProps) => {
   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow className="bg-G shadow-md">
                  <TableCell>
                     <Text weight={"bold"} color={"white"}>Request ID</Text>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                     <Text weight={"bold"} color={"white"}>See more detail</Text>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {Object.keys(props.data).map((requestID) => (
                  <TableRow key={requestID}>
                     <TableCell component="th" scope="row">
                        {requestID}
                     </TableCell>
                     <TableCell component="th" scope="row">
                        {props.data[requestID].contract_id}
                     </TableCell>
                     <TableCell>{props.data[requestID].amount}</TableCell>
                     <TableCell align={'center'}>{props.data[requestID].project_contractor_id}</TableCell>
                     <TableCell align={'center'}>{props.data[requestID].supply_vendor_id}</TableCell>
                     <TableCell align={'center'}><Text color={"black"} weight={'bold'}>{props.data[requestID].status}</Text></TableCell>
                     <TableCell align={'center'} ><Button label={"See more"} size={"xs"} theme={`B`} wrapperStyles={"w-1/2"} onClick={() => (props.handleOpenModal)(props.data[requestID])}/></TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};
const style = {
   button: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: "py-0 px-0 left-[8%]"
   },
   btnCreate: "left-[0%]",
}

export default RequestList;
