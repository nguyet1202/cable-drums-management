import { useState, useEffect } from "react";
import { child, get, ref } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import {CreateNewBtn, ModalRequestDetail,RequestList} from "../../components";
import {CreateRequest} from "./index";
type RequestData = {
   contract_id: string;
   project_contractor_id: string;
   amount: number;
   supply_vendor_id: string;
   status:string;
   teamname:string;
   phonenumbers:number;
   email:string,
   project_contractor_name:string,
   project_contractor_phone:string,
   project_contractor_email:string,
};
const Request = () => {
   const [data, setData] = useState<{ [key: string]: RequestData } | null>(null);
   const [selectedItem, setSelectedItem] = useState<RequestData | null>(null);
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);

   useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, `withdraw_requests`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               setData(snapshot.val());
            } else {
               setData(snapshot.val());
            }
         })
         .catch((error) => {
            throw new Error(error);
         });
   }, [data]);

   const fetchSupplyVendorInfo = async (contract_id: string) => {
      try {
         const contractSnapshot = await get(ref(database, `withdraw_requests/${contract_id}`));
         const contractData = contractSnapshot.val();

         if (contractSnapshot.exists()) {
            const vendorSnapshot = await get(ref(database, `supply_vendors/${contractData.supply_vendor_id}`));
            const vendorData = vendorSnapshot.val();
            if (vendorSnapshot.exists()) {
               const ProjectorSnapshot = await get(ref(database, `project_contractors/${contractData.project_contractor_id}`));
               const ProjectorData = ProjectorSnapshot.val();

               if (vendorSnapshot.exists()) {
                  setSelectedItem({
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
                  });
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
      setSelectedItem(item);
      fetchSupplyVendorInfo(item.contract_id);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };
   const openModal = () => {
      setShowModal(true);
   };

   return (
      <div className={`${style.wrapper}`}>
         <CreateNewBtn wrapperStyles={`${style.btnCreate}`} onClick={openModal} />
         <RequestList data={data ?? {}} handleOpenModal={handleOpenModal} />
         <ModalRequestDetail open={modalOpen} selectedItem={selectedItem} onClose={handleCloseModal} />
         <CreateRequest  open={showModal} onClose={() => setShowModal(false)} />

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
export default Request;
export {type RequestData}
