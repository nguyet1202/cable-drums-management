import {Routes, Route, Navigate} from 'react-router-dom';
import {
   PlanerHome, SystemAdminHome, Request, SupplyVendorHome,
   ProjectContractorHome, SignIn, Contract, SupplyTeamContract,
   SupplyVendorRequest, ContractorRequest, ContractorDashBoard, AdminDashBoard, UsersManagement, LoginRequire,
   PlannerDashBoard,SupplyDashBoard
} from "../view";
import {PrivateRoute} from "./index";
import {MainLayout} from "../view/layouts";

import {useGetAuthStatus} from "../hooks";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const MainRouting = () => {
   const data = useSelector((state: RootState) => state.user.data);
   const {isLoggedIn, isloading} = useGetAuthStatus();
   const isAuthenticated = isLoggedIn && data.role !== null;
   if (isloading) {
      return <div>Loading...</div>;
   }
   return (
      <Routes>
         <Route path="/login-require" element={<LoginRequire/>}/>
         <Route path="/signin" element={<SignIn/>}/>
         <Route element={<MainLayout/>}>
            <Route path="/" element={isAuthenticated ? <Navigate to={`/${data.role}`} replace={true}/> :
               <Navigate to="/signin" replace={true}/>}/>

            <Route element={<AdminDashBoard/>}>
               <Route path="/admin"
                      element={<PrivateRoute element={SystemAdminHome} authenticated={isLoggedIn} role="admin"/>}/>
               <Route path="/user"
                      element={<PrivateRoute element={UsersManagement} authenticated={isLoggedIn} role="admin"/>}/>
            </Route>
            <Route element={<PlannerDashBoard/>}>
               <Route path="/planner"
                      element={<PrivateRoute element={PlanerHome} authenticated={isLoggedIn} role="planner"/>}/>
               <Route path="/contract"
                      element={<PrivateRoute element={Contract} authenticated={isLoggedIn} role="planner"/>}/>
               <Route path="/allrequest"
                      element={<PrivateRoute element={Request} authenticated={isLoggedIn} role="planner"/>}/>
            </Route>
            <Route element={<SupplyDashBoard/>}>
               <Route path="/supply_vendor"
                      element={<PrivateRoute element={SupplyVendorHome} authenticated={isLoggedIn} role="supply_vendor"/>}/>
               <Route path="/supply_contract"
                      element={<PrivateRoute element={SupplyTeamContract} authenticated={isLoggedIn} role="supply_vendor"/>}/>
               <Route path="/supply_allrequest"
                      element={<PrivateRoute element={SupplyVendorRequest} authenticated={isLoggedIn} role="supply_vendor"/>}/>
            </Route>
            <Route element={<ContractorDashBoard/>}>
               <Route path="/project_contractor"
                      element={<PrivateRoute element={ProjectContractorHome} authenticated={isLoggedIn}
                                             role="project_contractor"/>}/>
               <Route path="/contractor_allrequest"
                      element={<PrivateRoute element={ContractorRequest} authenticated={isLoggedIn}
                                             role="project_contractor"/>}/>
            </Route>

         </Route>
      </Routes>
   );
};

export default MainRouting;