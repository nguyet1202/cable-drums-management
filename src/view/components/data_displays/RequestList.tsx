import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../../configs/FirebaseConfig";
import {get, ref, set, push, child} from "firebase/database";
import { RequestData } from "../../../store/slices/requestSlice";
import {TableDataRow,TableHeaderCell} from "./request";
import { useDispatch } from "react-redux";
type RequestListProps = {
   handleOpenModal: (item: RequestData) => void;
};

const RequestList = (props:RequestListProps) => {
   const data = useSelector((state: {
      request: { data: { [key: string]: RequestData } };
   }) => state.request.data);
   const [status, setStatus] = useState<string>("");
   const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>({});
   const userRole = localStorage.getItem("role");
   const [reloadComponent, setReloadComponent] = useState(false);

   const handleSelectRow = (requestID: string) => {
      setSelectedRows((prevSelectedRows) => ({
         ...prevSelectedRows,
         [requestID]: !prevSelectedRows[requestID],
      }));
   };

   const updateContractAmount = async (contractId: string, withdrawAmount: number) => {
      try {
         const contractRef = ref(database, `contracts/${contractId}`);
         const contractSnapshot = await get(contractRef);
         const contractData = contractSnapshot.val();
         if (contractSnapshot.exists()) {
            const currentAmount = contractData.contract_amount;
            const updatedAmount = currentAmount - withdrawAmount;
            await set(contractRef, { ...contractData, contract_amount: updatedAmount });
            alert("updated successfully");
         } else {
            alert(`Contract with ID ${contractId} does not exist`);
         }
      } catch (error) {
         alert(error);
      }
   };

   const updateRequestStatus = async (requestId: string) => {
      try {
         if (status === null) {
            alert("Status cannot be null");
         }
         const requestRef = ref(database, `withdraw_requests/${requestId}`);
         const snapshot = await get(requestRef);
         const currentData = snapshot.val();
         if (currentData.status === "collected") {
            alert("You cannot update");
         }
         if (currentData) {
            const updatedData = { ...currentData, status: status };
            await set(requestRef, updatedData);
            setSelectedRows((prevSelectedRows) => ({
               ...prevSelectedRows,
               [requestId]: false,
            }));

            const withdrawNotisRef = ref(database, "notification");
            const newNotiRef = push(withdrawNotisRef);
            const newNotiId = newNotiRef.key;
            const message =
               userRole === "project_contractor"
                  ? `project contractor updated the status of request ${requestId}`
                  : `supply vendor updated the status of request ${requestId}`;
            const notification = {
               id: newNotiId || "",
               requestId: requestId || "",
               supply_vendor_id: currentData.supply_vendor_id,
               project_contractor_id: currentData.project_contractor_id,
               planner_id: currentData.planner_id,
               message: message,
            };
            await set(newNotiRef, notification);
            setReloadComponent(true);
            if (status === "collected") {
               await updateContractAmount(currentData.contract_id, currentData.amount);
            }
         } else {
            console.log(`Request with ID ${requestId} does not exist`);
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };


   useEffect(() => {
      if (reloadComponent) {
         setReloadComponent(false);
      }
   }, [reloadComponent]);

   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow className="bg-G shadow-md">
                  <TableHeaderCell text="Request ID" />
                  <TableHeaderCell text="Contract ID" />
                  <TableHeaderCell text="Quantity" />
                  <TableHeaderCell text="Supply Team ID" />
                  <TableHeaderCell text="Contractor Team ID" />
                  <TableHeaderCell text="Status" />
                  {userRole !== "planner" && <TableHeaderCell text="Update Status" />}
                  <TableHeaderCell text="See more detail" />
               </TableRow>
            </TableHead>
            <TableBody>
               {Object.keys(data).length > 0 ? (
                  Object.keys(data).map((requestID) => (
                     <TableDataRow
                        key={requestID}
                        request={data[requestID]}
                        selected={selectedRows[requestID]}
                        handleSelectRow={handleSelectRow}
                        updateRequestStatus={updateRequestStatus}
                        status={status}
                        onChangeVendor={(event) => setStatus(event.target.value)}
                        onchangeContract={(event) => setStatus(event.target.value)}
                        onClickUpdateRequest={() => updateRequestStatus(requestID)}
                        onClickOpenSelect={() => handleSelectRow(requestID)}
                        onClickSeemore={() => (props.handleOpenModal)(data[requestID])}
                     />
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

export default RequestList;

