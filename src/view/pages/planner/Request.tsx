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
   buttoncreate:{
      wrapper:" w-1/10 flex item-end mb-5 mr-[-70%] ",
   },
   button:{
      size:"base" as "base",
      theme:"NoneBtn" as "NoneBtn",
      wrapperStyles:"flex item-end mb-5 left-[35%]",
      wrapperIconStyles:"left-[75%]"
   },
   btnCreate: "left-[0%]",
}

export default Request;

export {type RequestData}
