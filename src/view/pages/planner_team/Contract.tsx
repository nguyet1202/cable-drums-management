import { useState, useEffect } from "react";
import { child, get, ref } from "firebase/database";
import { database } from "../../../configs/FirebaseConfig";
import {ContractList} from "../../components";
import {ModalContract} from "../../components";
type ContractData = {
   start_date: string;
   end_date: string;
   contract_amount: number;
   supply_vendor_id: string;
   teamname:string;
   phonenumbers:number;
   email:string
};
const Contract = () => {
   const [data, setData] = useState<{ [key: string]: ContractData }>({});
   const [selectedItem, setSelectedItem] = useState<ContractData | null>(null);
   const [modalOpen, setModalOpen] = useState<boolean>(false);

   useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, `contracts`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               setData(snapshot.val());
            } else {
               throw new Error("No data available");
            }
         })
         .catch((error) => {
            throw new Error(error);
         });
   }, []);

   const fetchSupplyVendorInfo = async (supplyVendorId: string) => {
      try {
         const contractSnapshot = await get(ref(database, `contracts/${supplyVendorId}`));
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
      setSelectedItem(item);
      fetchSupplyVendorInfo(item.supply_vendor_id);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   return (
      <div className={`${style.wrapper}`}>
         <ContractList data={data} handleOpenModal={handleOpenModal} />
         <ModalContract open={modalOpen} selectedItem={selectedItem} onClose={handleCloseModal} />
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
