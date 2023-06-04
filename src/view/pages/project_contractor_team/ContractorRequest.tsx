import { useState, useEffect } from "react";
import {child, equalTo, get, orderByChild, query, ref} from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import {CreateNewBtn, ModalRequestDetail,RequestList} from "../../components";
type RequestData = {
   id?:string,
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
const ContractorRequest = () => {
   const [data, setData] = useState<{ [key: string]: RequestData }>({});
   const [selectedItem, setSelectedItem] = useState<RequestData | null>(null);
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const userID = localStorage.getItem('userID');
   console.log(userID)
   useEffect(() => {
      const fetchData = async () => {
         try {
            const userDataSnapshot = await get(ref(database, `users/${userID}`));
            const userData = userDataSnapshot.val();
            const project_contractor_id = userData.project_contractor_id;
            console.log(project_contractor_id)
            const requestsRef = ref(database, "withdraw_requests");
            const requestsQuery = query(requestsRef, orderByChild("project_contractor_id"), equalTo(project_contractor_id));
            const requestsSnapshot = await get(requestsQuery);
            const contractsData = requestsSnapshot.val();
            console.log()
            setData(contractsData);
         } catch (error) {
            console.error('Lỗi khi truy vấn dữ liệu:', error);
         }
      };

      fetchData();
   }, [userID]);

   const fetchContractorRequest = async (id: string) => {
      try {
         const contractSnapshot = await get(ref(database, `withdraw_requests/${id}`));
         const contractData = contractSnapshot.val();

         if (contractSnapshot.exists()) {
            const vendorSnapshot = await get(ref(database, `supply_vendors/${contractData.project_contractor_id}`));
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
      let id = item.id || "";
      setSelectedItem(item);
      fetchContractorRequest(id);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   return (
      <div className={`${style.wrapper}`}>
         <RequestList data={data}  handleOpenModal={handleOpenModal}  />
         <ModalRequestDetail open={modalOpen} selectedItem={selectedItem} onClose={handleCloseModal} />
      </div>
   );
};

const style = {
   wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3",
   button: {
      size: "xs" as "xs",
      theme: "A" as "A",
      wrapperStyles: "py-0 px-0 left-[8%]"
   },
   btnCreate: "left-[0%]",
}
export default ContractorRequest;
export {type RequestData}
