import {setDataRequest,RequestData} from "../../../store/slices/requestSlice";
import {useDispatch} from "react-redux";
import useGetData from "../../../hooks/useGetData";
import {RequestList} from "../../components";
import {Loading} from "../../base_component";
const Request = () => {

   const dispatch = useDispatch();

   const getDataAllRequest = useGetData('withdraw_requests', (snapshot) => {
      if (snapshot.exists()) {
         const Data = snapshot.val();
         dispatch(setDataRequest(Data))
      } else {
         console.log('No data available');
      }
   });

   if (getDataAllRequest) {
      return <Loading/>;
   }

   return (
      <div className={`${style.wrapper}`}>
         <RequestList />
      </div>
   );
};

const style = {
   wrapper: "w-full flex flex-col bg-W 2xl:px-32 flex items-center justify-center xl:px-16 xs:px-5 lg:px-3 ",
}

export default Request;

export {type RequestData}
