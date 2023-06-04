import { useState, useEffect } from "react";
import { child, get, ref, query, equalTo, orderByChild } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import { ContractList, ModalContract } from "../../components";
import {ContractData} from "../planner_team";

const SupplyTeamContract = () => {
   const [data, setData] = useState<{ [key: string]: ContractData }>({});
   const [selectedItem, setSelectedItem] = useState<ContractData | null>(null);
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const userID = localStorage.getItem('userID');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const userDataSnapshot = await get(ref(database, `users/${userID}`));
            const userData = userDataSnapshot.val();
            const supply_vendor_id = userData.supply_vendor_id;
            const contractsRef = ref(database, "contracts");
            const contractsQuery = query(contractsRef, orderByChild("supply_vendor_id"), equalTo(supply_vendor_id));
            const contractsSnapshot = await get(contractsQuery);
            const contractsData = contractsSnapshot.val();
            setData(contractsData);
         } catch (error) {
            console.error('Lỗi khi truy vấn dữ liệu:', error);
         }
      };

      fetchData();
   }, [userID]);

   const fetchSupplyVendorInfo = async (id: string) => {
      try {
         const contractSnapshot = await get(ref(database, `contracts/${id}`));
         const contractData = contractSnapshot.val();
         if (contractSnapshot.exists()) {
            const vendorSnapshot = await get(ref(database, `supply_vendors/${contractData.supply_vendor_id}`));
            const vendorData = vendorSnapshot.val();

            if (vendorSnapshot.exists()) {
               setSelectedItem({
                  start_date: contractData.start_date,
                  end_date: contractData.end_date,
                  contract_amount: contractData.contract_amount,
                  supply_vendor_id: contractData.supply_vendor_id,
                  teamname: vendorData.teamname,
                  phonenumbers: vendorData.phonenumbers,
                  email: vendorData.email
               });
            }
         } else {
            throw new Error("Contract not found");
         }
      } catch (error: unknown) {
         throw new Error(String(error));
      }
   };

   const handleOpenModal = (item: ContractData) => {
      let id = item.id || "";
      setSelectedItem(item);
      fetchSupplyVendorInfo(id);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   return (
      <div className="w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3">
         <ContractList data={data} handleOpenModal={handleOpenModal} />
         <ModalContract open={modalOpen} selectedItem={selectedItem} onClose={handleCloseModal} />
      </div>
   );
};

export default SupplyTeamContract;
