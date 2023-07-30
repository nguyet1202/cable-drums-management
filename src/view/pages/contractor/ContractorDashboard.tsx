import {DashboardLayout} from "../../layout";
import {Box} from "@mui/material";
import ContractorRequest from "./ContractorRequest";

function ContractorDashboard() {

   return (
       <DashboardLayout
           main={<Box {...cfn.mainLayout}>
              <ContractorRequest/>
           </Box>}
       />
   )
}

const cfn = {
   mainLayout: {
      sx: {
         display: "flex",
         flexDirection: "column",
      }
   }
}

export default ContractorDashboard