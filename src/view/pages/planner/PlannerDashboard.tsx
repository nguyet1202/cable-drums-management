import {DashboardLayout} from "../../layout";
import {useMemo} from "react"
import {TabNav, TabRouteType} from "../../components";
import {
   People,
   NotificationsSharp,
} from "@mui/icons-material"

import Contract from "./Contract";
import Request from "./Request";
import {Box} from "@mui/material"

function PlannerDashboard() {

   const routes = useMemo<TabRouteType[]>(() => {
      return [
         {
            label: "Contract",
            icon: <People fontSize="medium"/>,
            element: <Contract/>,
         },
         {
            label: "Request",
            icon: <NotificationsSharp fontSize="medium"/>,
            element: <Request/>,
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

export default PlannerDashboard