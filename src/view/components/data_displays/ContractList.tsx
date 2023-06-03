import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {Button, Text} from "../../base_components";
import {ContractData} from "../../pages/planner_team/Contract";

type ContractListProps = {
   data: { [key: string]: ContractData };
   handleOpenModal: (item: ContractData) => void;
};

const ContractList = (props:ContractListProps) => {
   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow className="bg-G shadow-md">
                  <TableCell>
                     <Text weight={"bold"} color={"white"}>Start Day</Text>
                  </TableCell>
                  <TableCell>
                     <Text weight={"bold"} color={"white"}>End Day</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Quantity</Text>
                  </TableCell>
                  <TableCell align={`center`}>
                     <Text weight={"bold"} color={"white"}>Supply Team ID</Text>
                  </TableCell>
                  <TableCell>
                     <Text weight={"bold"} color={"white"}>See more detail</Text>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {Object.keys(props.data).map((contractId) => (
                  <TableRow key={contractId}>
                     <TableCell component="th" scope="row">
                        {props.data[contractId].start_date}
                     </TableCell>
                     <TableCell>{props.data[contractId].end_date}</TableCell>
                     <TableCell align={'center'}>{props.data[contractId].contract_amount}</TableCell>
                     <TableCell align={'center'}>{props.data[contractId].supply_vendor_id}</TableCell>
                     <TableCell align={'center'} ><Button label={"See more"} size={"xs"} theme={`B`} wrapperStyles={"w-1/2"} onClick={() => (props.handleOpenModal)(props.data[contractId])}/></TableCell>
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

export default ContractList;
