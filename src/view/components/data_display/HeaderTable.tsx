import CreateNewBtn from "./CreateNewBtn";
import { Text } from "../../base_components";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

type HeaderTableProps = {
   label: string;
};

const HeaderTable = (props: HeaderTableProps) => {
   const data = useSelector((state: RootState) => state.user.data);

   return (
      <div className={`flex flex-row justify-between items-center w-full border-[1px] border-G2 pl-5 bg-G h-[72px] `}>
         <Text size={'2xl'} weight={'bold'} color={'white'}>{props.label}</Text>
         {data.role === 'admin' && <CreateNewBtn wrapperStyles={`top-2.5`} />}
         {data.role === 'planner' && <CreateNewBtn wrapperStyles={`top-2.5`} />}
      </div>
   );
};

export default HeaderTable;
