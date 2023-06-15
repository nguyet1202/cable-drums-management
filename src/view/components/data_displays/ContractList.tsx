import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {Button, Text} from "../../base_components";
import {ContractData} from "../../pages/planner_team/Contract";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
type ContractListProps = {
   handleOpenModal: (item: ContractData) => void;
};

const ContractList = (props:ContractListProps) => {
   const data = useSelector((state: RootState) => state.contract.data);
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
               {Object.keys(data).map((contractId) => (
                  <TableRow key={contractId}>
                     <TableCell component="th" scope="row">
                        {data[contractId].start_date}
                     </TableCell>
                     <TableCell>{data[contractId].end_date}</TableCell>
                     <TableCell align={'center'}>{data[contractId].contract_amount}</TableCell>
                     <TableCell align={'center'}>{data[contractId].supply_vendor_id}</TableCell>
                     <TableCell align={'center'} ><Button label={"See more"} size={"xs"} theme={`B`} wrapperStyles={"w-1/2"} onClick={() => (props.handleOpenModal)(data[contractId])}/></TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default ContractList;
