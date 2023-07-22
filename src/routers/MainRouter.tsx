import {Routes, Route} from 'react-router-dom';
import {
   RootLayout,
   Login,
   AdminDashboard,
   SupplyVendorDashboard,
   ContractorDashboard,
   PlannerDashboard,
   PageLayout
} from "../view";

const MainRouter = () => {
   return (
      <Routes>
         <Route path="/signin" element={<Login/>}/>

         <Route element={<RootLayout/>}>

            <Route element={<PageLayout/>}>
               <Route path="/admin" element={<AdminDashboard/>}/>
            </Route>

            <Route element={<PageLayout/>}>
               <Route path="/planner" element={<PlannerDashboard/>}/>
            </Route>

            <Route element={<PageLayout/>}>
               <Route path="/supply_vendors" element={<SupplyVendorDashboard/>}/>
            </Route>

            <Route element={<PageLayout/>}>
               <Route path="/project_contractors" element={<ContractorDashboard/>}/>
            </Route>

         </Route>
      </Routes>
   );
};

export default MainRouter;