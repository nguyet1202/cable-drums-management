import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import StatusChip from "./StatusChip";
import * as React from "react";

type WithdrawRequestActionProps = {
   params: any;
};

const WithdrawRequestAction = ({params}: WithdrawRequestActionProps) => {
   const role = useSelector((state: RootState) => state.user.data.role);
   const [disabled, setDisabled] = useState<boolean>(true)
   useEffect(() => {
      if (role === "supply_vendors" && params.row.status === "new") {
         setDisabled(false);
      } else if (
         role === "project_contractors" &&
         params.row.status === "ready to collect"
      ) {
         setDisabled(false);
      } else {
         setDisabled(true);
      }
   }, [role, params.row.status]);



   return (
      <div>
         <StatusChip status={params.row.status} isDisabled={disabled}/>
      </div>
   );
};

export default WithdrawRequestAction;
