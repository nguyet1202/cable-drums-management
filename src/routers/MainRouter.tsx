import {Routes, Route, Navigate} from 'react-router-dom';
import {
   RootLayout,
   Login,
   AdminDashboard,
   SupplyVendorDashboard,
   ContractorDashboard,
   PlannerDashboard,
   PageLayout,
   LoginRequire,
   Loading
} from "../view";
import {PrivateRoute} from "./PrivateRoute";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const MainRouter = () => {
   const data = useSelector((state: RootState) => state.user.data);
   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
   const isLoading = useSelector((state: RootState) => state.auth.isLoading);
   const isAuthenticated = isLoggedIn && data.role !== null;

   if (isLoading) {
      return (
         <Loading/>
      );
   }
   return (
      <Routes>
         <Route path="/signin" element={<Login/>}/>
         <Route path="/login-require" element={<LoginRequire/>}/>

         <Route element={<RootLayout/>}>
            <Route path="/" element={isAuthenticated ? <Navigate to={`/${data.role}`} replace={true}/> :
               <Navigate to="/signin" replace={true}/>}/>

            <Route element={<PageLayout/>}>
               <Route path="/admin"
                      element={<PrivateRoute element={AdminDashboard} authenticated={isLoggedIn} role="admin"/>}/>
            </Route>
            <Route element={<PageLayout/>}>
               <Route path="/planner"
                      element={<PrivateRoute element={PlannerDashboard} authenticated={isLoggedIn} role="planner"/>}/>
            </Route>
            <Route element={<PageLayout/>}>
               <Route path="/supply_vendors"
                      element={<PrivateRoute element={SupplyVendorDashboard} authenticated={isLoggedIn}
                                             role="supply_vendors"/>}/>
            </Route>
            <Route element={<PageLayout/>}>
               <Route path="/project_contractors"
                      element={<PrivateRoute element={ContractorDashboard} authenticated={isLoggedIn}
                                             role="project_contractors"/>}/>
            </Route>

         </Route>
      </Routes>
   );
};

export default MainRouter;