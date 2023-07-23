import { Text} from "../../base_component";
import {database} from "../../../configs/firebaseConfig";
import {get, ref, set,child} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {closeModal} from "../../../store/slices/modalSlice";
import WithdrawRequestForm from "./WithdrawRequestForm";
import {Close} from "@mui/icons-material";
import usePushNotification from "../../../hooks/usePushNotification";
import {
   Dialog,
   DialogTitle,
   IconButton,
} from '@mui/material';

type FormValues = {
   amount: number;
   contract_id: string;
   project_contractor_name: string;
};
const CreateWithdrawRequest = () => {
   const dispatch = useDispatch();
   const showModal = useSelector((state: RootState) => state.modal.showModal);
   const plannerID = useSelector((state: RootState) => state.user.data.teamID);

   const { pushNotification } = usePushNotification();
   const handleCloseModal = () => {
      dispatch(closeModal());
   };

   const CreateNewRequest = async (values: FormValues) => {
      const snapshot = await get(ref(database, `contracts/${values.contract_id}`));
      const withdrawRequests = snapshot.val();
      const contractAmount = withdrawRequests.contract_amount;
      if (Number(values.amount) > contractAmount) {
         alert('The entered amount exceeds the current available amount');
      } else {
         const GetRequestRef = await get(ref(database, 'withdraw_requests'));
         const withdrawRequestsRef = ref(database, 'withdraw_requests');
         const GetRequest = GetRequestRef.val();
         const id = GetRequest ? Object.keys(GetRequest).length : 0;
         const newRequestId = id + 1;
         const customID = `request_0${newRequestId}`;
         const newRequestRef = child(withdrawRequestsRef, customID)
         const newRequest = {
            id: customID || '',
            plannerID,
            contract_id: values.contract_id,
            project_contractor_name: values.project_contractor_name,
            amount: values.amount,
            supply_vendor_id: withdrawRequests.supply_vendor_id,
            status: 'new',
            created_at: new Date().toLocaleDateString(),
         };
         await set(newRequestRef, newRequest);
         if (plannerID) {
            await pushNotification(customID, withdrawRequests.supply_vendor_id, values.project_contractor_name, plannerID);
         }
         handleCloseModal();
      }
   };


   return (
      <Dialog open={showModal} onClose={handleCloseModal} maxWidth="xs" fullWidth >
         <DialogTitle sx={{
            marginTop: '5px'
         }}>
            <Text {...style.text}>Create new Request</Text>
            <IconButton
               sx={{
                  position: 'absolute',
                  top: 10,
                  right: 8,
                  color: (theme) => theme.palette.grey[500],
               }}
               onClick={handleCloseModal}
            >
               <Close sx={{fontSize: '40px'}}/>
            </IconButton>
         </DialogTitle>
         <WithdrawRequestForm onSubmit={CreateNewRequest}/>
      </Dialog>
   )
      ;
};

const style = {
   text: {
      size: '2xl' as '2xl',
      weight: 'bold' as 'bold',
      color: 'pink' as 'pink',
      font: 'A' as 'A',
      wrapperStyles: 'text-center',
   },
   textError: {
      size: "base" as "base",
      weight: "normal" as "normal",
      color: "pink" as "pink",
      font: "A" as "A",
      wrapperStyles: "flex self-end items-end"
   },
}

export default CreateWithdrawRequest;
