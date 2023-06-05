import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedItemRequest} from "../store/slices/requestSlice";
import { get, ref } from 'firebase/database';
import { database} from "../configs/FirebaseConfig";

const useGetdetailRequest = (id: string) => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchSupplyVendorInfo = async () => {
         try {
            const contractSnapshot = await get(ref(database, `withdraw_requests/${id}`));
            const contractData = contractSnapshot.val();

            if (contractSnapshot.exists()) {
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
               throw new Error("Contract not found");
            }
         } catch (error: unknown) {
            throw new Error(String(error));
         }
      };

      fetchSupplyVendorInfo();
   }, [id, dispatch]);

   return null; // Hoặc bạn có thể trả về giá trị khác tùy theo nhu cầu của bạn
};

export default useGetdetailRequest;
