import { useEffect } from "react";
import { get, ref, query, equalTo, orderByChild } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import { ContractList, ModalContract } from "../../components";
import {ContractData} from "../../../store/slices/contractSlice";
import { useDispatch } from 'react-redux';
import {setSelectedItem,setData} from "../../../store/slices/contractSlice";
import {openModal} from "../../../store/slices/modalSlice";
const SupplyTeamContract = () => {
   const userID = localStorage.getItem('userID');
   const dispatch = useDispatch();
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
            dispatch(setData(contractsData));
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
               dispatch(setSelectedItem({
                  start_date: contractData.start_date,
                  end_date: contractData.end_date,
                  contract_amount: contractData.contract_amount,
                  supply_vendor_id: contractData.supply_vendor_id,
                  teamname: vendorData.teamname,
                  phonenumbers: vendorData.phonenumbers,
                  email: vendorData.email
               }));
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
      dispatch(openModal(true));
   };

   return (
      <div className="w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3">
         <ContractList handleOpenModal={handleOpenModal} />
         <ModalContract />
      </div>
   );
};

export default SupplyTeamContract;
