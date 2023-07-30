import {useMemo} from "react";
import {TabNav, TabRouteType} from "../../components";
import {NotificationsSharp, People} from "@mui/icons-material";
import SupplyContract from "./SupplyContract";
import SupplyVendorRequest from "./SupplyVendorRequest";
import {Box} from "@mui/material";
import {DashboardLayout} from "../../layout";

function SupplyVendorDashboard() {

   const routes = useMemo<TabRouteType[]>(() => {
      return [
         {
            label: "Contract",
            icon: <People fontSize="medium"/>,
            element: <SupplyContract/>,
         },
         {
            label: "Request",
            icon: <NotificationsSharp fontSize="medium"/>,
            element: <SupplyVendorRequest/>,
         },
      ];
   }, [])

   return (
       <DashboardLayout
           main={<Box {...cfn.mainLayout}>
              <TabNav routes={routes}/>
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
export default SupplyVendorDashboard