import {RequestList} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {equalTo, get, orderByChild, query, ref} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";
import {setDataRequest} from "../../../store/slices/requestSlice";
import {RootState} from "../../../store/store";
const ContractorRequest = () => {

    const userID = localStorage.getItem('ID');
    const data = useSelector((state: RootState) => state.request.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataSnapshot = await get(ref(database, `users/${userID}`));
                const userData = userDataSnapshot.val();
                const project_contractor_id = userData.teamID;
                const contractsRef = ref(database, "withdraw_requests");
                const contractsQuery = query(contractsRef, orderByChild("project_contractor_id"), equalTo(project_contractor_id));
                const contractsSnapshot = await get(contractsQuery);
                const requestsData = contractsSnapshot.val();
                dispatch(setDataRequest(requestsData));
            } catch (error) {
                console.error('Lỗi khi truy vấn dữ liệu:', error);
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
export default ContractorRequest