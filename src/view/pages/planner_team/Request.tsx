import React, {useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import { ModalRequestDetail,RequestList} from "../../components";
import {CreateRequest} from "./index";
import {setSelectedItemRequest,setDataRequest,RequestData} from "../../../store/slices/requestSlice";
import {openModal} from "../../../store/slices/modalSlice";
import {FiPlusCircle} from "react-icons/fi";
import {Button} from "../../base_components";
import {useDispatch} from "react-redux";
import {useGetData} from "../../../hooks";
const Request = () => {
   const dispatch = useDispatch();
   const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
   const getDataAllContract = useGetData('withdraw_requests', (snapshot) => {
      if (snapshot.exists()) {
         dispatch(setDataRequest(snapshot.val()));
      } else {
         console.log('No data available');
      }
   });

   if (getDataAllContract) {
      return <div>Loading...</div>;
   }

   const fetchDetail = async (id: string) => {
      try {
         const contractSnapshot = await get(ref(database, `withdraw_requests/${id}`));
         const contractData = contractSnapshot.val();

         if (contractSnapshot.exists()) {
            const vendorSnapshot = await get(ref(database, `supply_vendors/${contractData.supply_vendor_id}`));
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
            throw new Error("Contract not found");
         }
      } catch (error: unknown) {
         throw new Error(String(error));
      }
   };

   const handleOpenModal = (item: RequestData) => {
      let id = item.id || "";
      dispatch(setSelectedItemRequest(item));
      fetchDetail(id);
      dispatch(openModal(true));
   };
   const opendetailModal = () => {
      setShowModalCreate(true);
   };
   return (
      <div className={`${style.wrapper}`}>
         <Button
            iconLeft={<FiPlusCircle size={50} />}
            label="Create new"
            {...style.button}
            onClick={opendetailModal}
         />
         <RequestList handleOpenModal={handleOpenModal} />
         <ModalRequestDetail />
         <CreateRequest open={showModalCreate} onClose={() => setShowModalCreate(false)}/>

      </div>
   );
};

const style = {
   wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
   buttoncreate:{
      wrapper:" w-1/10 flex item-end mb-5 mr-[-70%] ",

   },
   button:{
      size:"base" as "base",
      theme:"A" as "A",
      wrapperStyles:"flex item-end mb-5 left-[35%]",
      wrapperIconStyles:"left-[75%]"
   },
   btnCreate: "left-[0%]",
}
export default Request;
export {type RequestData}
