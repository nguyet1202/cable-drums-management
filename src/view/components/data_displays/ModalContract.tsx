import {Modal} from '@mui/material';
import {ContractData} from "../../pages/planner_team/Contract";
import {Button, Text} from "../../base_components";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type ContractModalProps = {
   open: boolean;
   onClose: () => void;
   selectedItem: ContractData | null;
};

const ModalContract = ({open, onClose, selectedItem}: ContractModalProps) => {
      return (
         <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
         >
            <div className={style.modalWrapper}>
               <div className={style.modalContent}>
                  <Text {...style.text}>
                     CONTRACT DETAIL
                  </Text>
                  {selectedItem && (
                     <TableContainer component={Paper}>
                        <Table sx={{minWidth: 1000}} aria-label="customized table">
                           <TableHead>
                              <TableRow>
                                 <StyledTableCell>Supply Team ID</StyledTableCell>
                                 <StyledTableCell align="right">Team Name</StyledTableCell>
                                 <StyledTableCell align="right">Phone</StyledTableCell>
                                 <StyledTableCell align="right">Email</StyledTableCell>
                                 <StyledTableCell align="right">Start Date</StyledTableCell>
                                 <StyledTableCell align="right">End Date</StyledTableCell>
                                 <StyledTableCell align="right">Contract Amount</StyledTableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              <StyledTableRow key={selectedItem.supply_vendor_id}>
                                 <StyledTableCell component="th" scope="row">
                                    {selectedItem.supply_vendor_id}
                                 </StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.teamname}</StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.phonenumbers}</StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.email}</StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.start_date}</StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.end_date}</StyledTableCell>
                                 <StyledTableCell align="right">{selectedItem.contract_amount}</StyledTableCell>
                              </StyledTableRow>
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
                  <Button label={'Close'} onClick={onClose} size={'xs'} theme={'B'} wrapperStyles={"w-1/5"}></Button>
               </div>
            </div>
         </Modal>
      )
   }
;
const style = {
   modalWrapper: "fixed top-0 left-80 right-20 bottom-0 flex items-center justify-center bg-black bg-opacity-30",
   modalContent: "bg-B2 rounded px-16 py-16 flex flex-col gap-7",
   closeButton: "bg-gray-500 text-white px-4 py-2 rounded",
   text: {
      size: "2xl" as "2xl",
      weight: "extrabold" as "extrabold",
      color: "pink" as "pink",
      font: "B" as "B",
      wrapperStyles: "text-center lg:w-full xl:text-4xl 2xl:text-4xl mb-5"
   },
}
const StyledTableCell = styled(TableCell)(({theme}) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));
export default ModalContract;
