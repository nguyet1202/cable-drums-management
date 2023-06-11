import { useEffect } from "react";
import {equalTo, get, orderByChild, query, ref} from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import { ModalRequestDetail,RequestList} from "../../components";
import { useDispatch } from 'react-redux';
import {setSelectedItemRequest,setDataRequest,RequestData} from "../../../store/slices/requestSlice";
import {openModal} from "../../../store/slices/modalSlice";
const SupplyVendorRequest = () => {
   const dispatch = useDispatch();
   const userID = localStorage.getItem('userID');
   useEffect(() => {
   const fetchData = async () => {
      try {
         const userDataSnapshot = await get(ref(database, `users/${userID}`));
         const userData = userDataSnapshot.val();
         const supply_vendor_id = userData.supply_vendor_id;
         const requestsRef = ref(database, "withdraw_requests");
         const requestsQuery = query(requestsRef, orderByChild("supply_vendor_id"), equalTo(supply_vendor_id));
         const requestsSnapshot = await get(requestsQuery);
         const contractsData = requestsSnapshot.val();
         dispatch(setDataRequest(contractsData));
      } catch (error) {
         dispatch(setDataRequest(null));
      }
   };

   fetchData();
}, []);

   const fetchSupplyVendorRequest = async (id: string) => {
      try {
         const RequestSnapshot = await get(ref(database, `withdraw_requests/${id}`));
         const contractData = RequestSnapshot.val();
         if (RequestSnapshot.exists()) {
            const vendorSnapshot = await get(ref(database, `supply_vendors/${contractData.contract_id}`));
            const vendorData = vendorSnapshot.val();
            if (vendorSnapshot.exists()) {
               const ProjectorSnapshot = await get(ref(database, `project_contractors/${contractData.project_contractor_id}`));
               const ProjectorData = ProjectorSnapshot.val();

               if (vendorSnapshot.exists()) {
                  dispatch(setSelectedItemRequest({
                     contract_id: contractData.contract_id,
                     project_contractor_id: contractData.project_contractor_id,
                     project_contractor_name: ProjectorData.teamname,
                     project_contractor_phone: ProjectorData.phonenumbers,
                     project_contractor_email: ProjectorData.email,
                     amount: contractData.amount,
                     status: contractData.status,
                     supply_vendor_id: contractData.supply_vendor_id,
                     teamname: vendorData.teamname,
                     phonenumbers: vendorData.phonenumbers,
                     email: vendorData.email
                  }));
               }
            }
         } else {
            dispatch(setSelectedItemRequest(null));
         }
      } catch (error) {
         console.log(error)
      }
   };

   const handleOpenModal = (item: RequestData) => {
      dispatch(setSelectedItemRequest(item));
      let id = item.id || "";
      fetchSupplyVendorRequest(id);
      dispatch(openModal(true));
   };


   return (
      <div className={`${style.wrapper}`}>
         <RequestList handleOpenModal={handleOpenModal}  />
         <ModalRequestDetail />
      </div>
   );
};

const style = {
   wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
   button: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: "py-0 px-0 left-[8%]"
   },
   btnCreate: "left-[0%]",
}
export default SupplyVendorRequest;
export {type RequestData}


