import {useDispatch} from "react-redux";
import useGetData from "../../../hooks/useGetData";
import {ContractList} from "../../components";
import {Loading} from "../../base_component";
import {setData} from "../../../store/slices/contractSlice";

const Contract = () => {

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
}
export default Contract;
