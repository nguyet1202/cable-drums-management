import { useEffect } from "react";
import { get, ref, query, equalTo, orderByChild } from "firebase/database";
import {database} from "../../../configs/firebaseConfig";
import {useDispatch} from "react-redux";
import {ContractList} from "../../components";
import {Loading} from "../../base_component";
import {setData} from "../../../store/slices/contractSlice";

const SupplyContract = () => {

    const userID = localStorage.getItem('ID');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataSnapshot = await get(ref(database, `users/${userID}`));
                const userData = userDataSnapshot.val();
                const supply_vendor_id = userData.teamID;

                const contractsRef = ref(database, "contracts");
                const contractsQuery = query(contractsRef, orderByChild("supply_vendor_id"), equalTo(supply_vendor_id));
                const contractsSnapshot = await get(contractsQuery);
                const contractsData = contractsSnapshot.val();
                dispatch(setData(contractsData))
            } catch (error) {
                console.error('Lỗi khi truy vấn dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`${style.wrapper}`}>
            <ContractList />
        </div>
    );
};

const style = {
    wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
}
export default SupplyContract;
