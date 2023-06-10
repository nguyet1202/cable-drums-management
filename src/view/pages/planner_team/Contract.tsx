// import { get, ref } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import {ContractList} from "../../components";
import {ModalContract} from "../../components";
import { useDispatch } from 'react-redux';
import {setSelectedItem,setData,ContractData} from "../../../store/slices/contractSlice";
import {openModal} from "../../../store/slices/modalSlice";
import {useGetData} from "../../../hooks";
import { useEffect } from "react";
import { child, get, ref } from "firebase/database";
const Contract = () => {
   const dispatch = useDispatch();
   const getDataAllContract = useGetData('contracts', (snapshot) => {
      if (snapshot.exists()) {
         dispatch(setData(snapshot.val()));
      } else {
         console.log('No data available');
      }
   });

   if (getDataAllContract) {
      return <div>Loading...</div>;
   }

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
      dispatch(setSelectedItem(item));
      fetchSupplyVendorInfo(id);
      dispatch(openModal(true));
   };

   return (
      <div className={`${style.wrapper}`}>
         <ContractList handleOpenModal={handleOpenModal} />
         <ModalContract/>
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
export default Contract;
export {type ContractData}
