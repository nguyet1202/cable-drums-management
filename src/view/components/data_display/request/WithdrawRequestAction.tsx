import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {database} from "../../../../configs/firebaseConfig";
import {get, ref, set} from "firebase/database";
import StatusChip from "./StatusChip";
import * as React from "react";
import usePushNotification from "../../../../hooks/usePushNotification";

type WithdrawRequestActionProps = {
    params: any;
};

const WithdrawRequestAction = ({params}: WithdrawRequestActionProps) => {

    const role = useSelector((state: RootState) => state.user.data.role);
    const {pushNotification, isLoading, error} =usePushNotification();

    const [disabled, setDisabled] = useState<boolean>(true)
    const [newStatus, setNewStatus] = useState<string>('')

    useEffect(() => {
        if (role === "supply_vendors" && params.row.status === "new") {
            setDisabled(false);
            setNewStatus('ready to collect')
        } else if (
            role === "project_contractors" &&
            params.row.status === "ready to collect"
        ) {
            setDisabled(false);
            setNewStatus('collected')
        } else {
            setDisabled(true);
        }
    }, [role, params.row.status]);

    const updateContractAmount = async (contractId: string, withdrawAmount: number) => {
        const contractRef = ref(database, `contracts/${contractId}`);
        const contractSnapshot = await get(contractRef);
        const contractData = contractSnapshot.val();
        const currentAmount = contractData.contract_amount;
        const updatedAmount = currentAmount - withdrawAmount;
        await set(contractRef, {...contractData, contract_amount: updatedAmount});
    };

    const updateRequestStatus = async (requestId: string, newstatus: string) => {
        const requestRef = ref(database, `withdraw_requests/${requestId}`);
        const snapshot = await get(requestRef);
        const currentData = snapshot.val();
        if (currentData.status === ("collected" || "new") && role === "project_contractor") {
            setDisabled(true)
        } else {
            const updatedData = {...currentData, status: newstatus, created_at: new Date().toLocaleString()};
            await set(requestRef, updatedData);
            await updateContractAmount(currentData.contract_id, currentData.amount)
            await pushNotification(requestId, currentData.supply_vendor_id, currentData.project_contractor_id, currentData.plannerID);
            setDisabled(true)

        }
    };

    return (
        <div>
            <StatusChip status={params.row.status} isDisabled={disabled}
                        onClick={() => updateRequestStatus(params.row.id, newStatus)}/>
        </div>
    );
};

export default WithdrawRequestAction;
