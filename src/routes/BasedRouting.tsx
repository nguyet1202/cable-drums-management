import {Routes, Route, Navigate} from 'react-router-dom';
import {PlanerHome, SystemAdminHome, SupplyVendorHome, ProjectContractorHome, SignIn} from "../view";
import {AuthNavigation, PrivateRoute} from "./RoleNavigation";

const BasedRouting = () => {
   const {isLoggedIn,loading} = AuthNavigation();
   const userRole = localStorage.getItem('role');
   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <Routes>
         <Route path="/" element={isLoggedIn ? <Navigate to={`/${userRole}`}/> : <SignIn/>}/>
         <Route path="/admin"
                element={<PrivateRoute element={SystemAdminHome} authenticated={isLoggedIn} role="admin"/>}/>
         <Route path="/supply_vendor"
                element={<PrivateRoute element={SupplyVendorHome} authenticated={isLoggedIn} role="supply_vendor"/>}/>
         <Route path="/planner"
                element={<PrivateRoute element={PlanerHome} authenticated={isLoggedIn} role="planner"/>}/>
         <Route path="/project_contractor"
                element={<PrivateRoute element={ProjectContractorHome} authenticated={isLoggedIn}
                                       role="project_contractor"/>}/>
      </Routes>
   );
};

export default BasedRouting;
