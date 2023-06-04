import {Modal} from '@mui/material';
import {RequestData} from "../../../store/slices/requestSlice";
import {Button, Text} from "../../base_components";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../../store/slices/modalSlice";
const ModalRequestDetail = () => {
   const selectedItem = useSelector((state: { request:
         { selectedItem: RequestData | null } }) => state.request.selectedItem);
   const dispatch = useDispatch();
   const showModal = useSelector((state: { modal:
         { showModal: boolean } }) => state.modal.showModal);
   const handleCloseModal = () => {
      dispatch(closeModal());
   };
      return (
         <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
         >
            <div className={style.modalWrapper}>
               <div className={style.modalContent}>
                  <Text {...style.text}>
                     Details Of Cable Withdraw Request
                  </Text>
                  {selectedItem && (
                     <TableContainer component={Paper}>
                        <Table sx={{minWidth: 1000}} aria-label="customized table">
                           <TableHead>
                              <TableRow>
                                 <StyledTableCell>
                                    <Text color={"white"} size={'sm'}>Contract ID</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text  color={"white"} size={'sm'}>Quantity</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"white"} size={'sm'}>Status</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text  color={"white"} size={'sm'}>Supply Team Name</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text  color={"white"} size={'sm'}>Supply Team Phone</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"white"} size={'sm'}>Supply Team Email</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"white"} size={'sm'}>Contractor Team Name</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"white"} size={'sm'}>Contractor Team Phone</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"white"} size={'sm'}>Contractor Team Email</Text>
                                 </StyledTableCell>

                              </TableRow>
                           </TableHead>
                           <TableBody>
                              <StyledTableRow key={selectedItem.supply_vendor_id}>
                                 <StyledTableCell component="th" scope="row">
                                    {selectedItem.contract_id}
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.amount}</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"pink"} size={'lg'} weight={'extrabold'}>{selectedItem.status}</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.teamname}</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.phonenumbers}</Text>
                                 </StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.email}
                                    </Text></StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.project_contractor_name}
                                    </Text></StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.phonenumbers}
                                    </Text></StyledTableCell>
                                 <StyledTableCell align="right">
                                    <Text color={"black"}>{selectedItem.project_contractor_email}</Text>
                                 </StyledTableCell>

                              </StyledTableRow>
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
                  <Button label={'Close'} onClick={handleCloseModal} size={'xs'} theme={'B'} wrapperStyles={"w-1/5"}></Button>
               </div>
            </div>
         </Modal>
      )
   }
;
const style = {
   modalWrapper: "fixed top-0 left-1/4 right-[2.7%] bottom-0 flex items-center justify-center bg-black bg-opacity-30",
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
export default ModalRequestDetail;
