import { useEffect } from "react";
import {equalTo, get, orderByChild, query, ref} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";
import {useDispatch, useSelector} from 'react-redux';
import {setDataRequest,RequestData} from "../../../store/slices/requestSlice";
import {RequestList} from "../../components";
import {RootState} from "../../../store/store";
const SupplyVendorRequest = () => {
    const dispatch = useDispatch();
    const userID = localStorage.getItem('ID');
    const data = useSelector((state: RootState) => state.request.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataSnapshot = await get(ref(database, `users/${userID}`));
                const userData = userDataSnapshot.val();
                const supply_vendor_id = userData.teamID;

                const requestsRef = ref(database, "withdraw_requests");
                const requestsQuery = query(requestsRef, orderByChild("supply_vendor_id"), equalTo(supply_vendor_id));
                const requestsSnapshot = await get(requestsQuery);
                const requestsData = requestsSnapshot.val();
                dispatch(setDataRequest(requestsData));
            } catch (error) {
                dispatch(setDataRequest(null));
            }
        };
        fetchData();
    }, [data]);

    return (
        <div className={`${style.wrapper}`}>
            <RequestList />
        </div>
    );
};

const style = {
    wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
}
export default SupplyVendorRequest;
export {type RequestData}


