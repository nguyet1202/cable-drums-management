import {Box, Tab, Tabs} from "@mui/material";
import TabPanel from "./TabPanel";
import {ReactElement, ReactNode, SyntheticEvent, useState} from "react";

type TabRouteType = {
   label: ReactNode;
   icon: ReactElement;
   isClosable?: boolean;
   element: ReactNode;
};

type TabNavProps = {
   routes: TabRouteType[];
   onTabChange?: () => void;
};

function TabNav(props: TabNavProps) {
   const [tab, setTab] = useState(0);
   const handleChange = (_event: SyntheticEvent, newValue: number) => {
      props.onTabChange && props.onTabChange();
      setTab(newValue);
   };

   return (
      <>
         <Box {...cfn.tabWrapper}>
            <Tabs
               scrollButtons="auto"
               value={tab}
               onChange={handleChange}
               aria-label="icon label tabs example"
            >
               {props.routes.map((route, index) => {
                  return (
                     <Tab
                        key={index}
                        icon={route.icon}
                        label={route.label}
                        {...getTabAccessibilityProps(index)}
                     />
                  );
               })}
            </Tabs>
         </Box>
         {props.routes.map((route, index) => {
            return (
               <TabPanel key={index} value={tab} index={index}>
                  <>{route.element}</>
               </TabPanel>
            );
         })}
      </>
   );
}

function getTabAccessibilityProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
}

const cfn = {
   tabWrapper: {
      sx: {
         width: "100%",
         display: "flex",
         alignItems: "center",
         justifyContent: "space-around",
      },
   },
};

export default TabNav;
export {type TabRouteType};
