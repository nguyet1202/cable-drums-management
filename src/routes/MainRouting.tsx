import {Routes, Route, Navigate} from 'react-router-dom';
import {PlanerHome, SystemAdminHome,Request, SupplyVendorHome,
   ProjectContractorHome, SignIn,Contract,SupplyTeamContract,
   SupplyVendorRequest,ContractorRequest,ContractorMainSideBar,AdminMainSideBar,UsersManagement} from "../view";
import {LoginStatus,PrivateRoute} from "./index";
import LoginRequire from "./LoginRequire";
import {MainLayout} from "../view/layouts";
const MainRouting = () => {
   const {isLoggedIn,loading} = LoginStatus();
   const userRole = localStorage.getItem('role');
   console.log(userRole)
   const isAuthenticated = isLoggedIn && userRole !== null;
   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <Routes>
         <Route path="/" element={isAuthenticated ? <Navigate to={`/${userRole}`} replace={true} /> : <Navigate to="/signin" replace={true} />} />
         <Route path="/login-require" element={<LoginRequire />} />
         <Route path="/signin" element={<SignIn />} />

         <Route element={<AdminMainSideBar />}>
            <Route path="/admin" element={<PrivateRoute element={SystemAdminHome} authenticated={isLoggedIn} role="admin" />} />
            <Route path="/user" element={<PrivateRoute element={UsersManagement} authenticated={isLoggedIn} role="admin"/>} />
         </Route>
         <Route element={<ContractorMainSideBar />}>
            <Route path="/project_contractor" element={<PrivateRoute element={ProjectContractorHome} authenticated={isLoggedIn} role="project_contractor" />} />
            <Route path="/contractor-request" element={<PrivateRoute element={ContractorRequest} authenticated={isLoggedIn} role="project_contractor"/>} />
         </Route>
         <Route element={<MainLayout />}>
            <Route path="/supply_vendor" element={<PrivateRoute element={SupplyVendorHome} authenticated={isLoggedIn} role="supply_vendor" />} />
            <Route path="/planner" element={<PrivateRoute element={PlanerHome} authenticated={isLoggedIn} role="planner" />} />
            <Route path="/contract" element={<PrivateRoute element={userRole === "planner" ? Contract : SupplyTeamContract}
                                                           authenticated={isLoggedIn} role={["planner", "supply_vendor"]} />} />
            <Route path="/allrequest" element={<PrivateRoute element={userRole === "planner" ? Request : SupplyVendorRequest}
                                                             authenticated={isLoggedIn} role={["planner", "supply_vendor"]} />} />
         </Route>

      </Routes>
   );
};

export default MainRouting;