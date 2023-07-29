import {useDispatch} from "react-redux";
import useGetData from "../../../hooks/useGetData";
import {ContractList} from "../../components";
import {Loading} from "../../base_component";
import {setData} from "../../../store/slices/contractSlice";

const Request = () => {

   const dispatch = useDispatch();

   const getDataAllContract = useGetData('contracts', (snapshot) => {
      if (snapshot.exists()) {
         const Data = snapshot.val();
         dispatch(setData(Data))
      } else {
         console.log('No data available');
      }
   });

   if (getDataAllContract) {
      return <Loading/>;
   }

   return (
      <div className={`${style.wrapper}`}>
         <ContractList />
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
