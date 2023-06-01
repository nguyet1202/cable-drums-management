import {Routes, Route, Navigate} from 'react-router-dom';
import {PlanerHome, SystemAdminHome, SupplyVendorHome, ProjectContractorHome, SignIn} from "../view";
import {LoginStatus,PrivateRoute} from "./index";
import LoginRequire from "./LoginRequire";
const MainRouting = () => {
   const {isLoggedIn,loading} = LoginStatus();
   const userRole = localStorage.getItem('role');
   const isAuthenticated = isLoggedIn && userRole !== null;
   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <Routes>
         <Route path="/" element={isAuthenticated ? <Navigate to={`/${userRole}`} replace={true} /> : <Navigate to="/signin" replace={true} />} />
         <Route path="/login-require" element={<LoginRequire />} />
         <Route path="/signin" element={<SignIn />} />
         <Route path="/admin" element={<PrivateRoute element={SystemAdminHome} authenticated={isLoggedIn} role="admin" />} />
         <Route path="/supply_vendor" element={<PrivateRoute element={SupplyVendorHome} authenticated={isLoggedIn} role="supply_vendor" />} />
         <Route path="/planner" element={<PrivateRoute element={PlanerHome} authenticated={isLoggedIn} role="planner" />} />
         <Route path="/project_contractor" element={<PrivateRoute element={ProjectContractorHome} authenticated={isLoggedIn} role="project_contractor" />} />
      </Routes>
   );
};

export default MainRouting;
