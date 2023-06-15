import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ContractData = {
   id?: string;
   start_date: string;
   end_date: string;
   contract_amount: number;
   supply_vendor_id: string;
   teamname: string;
   phonenumbers: number;
   email: string;
};

type ContractState ={
   data: { [key: string]: ContractData };
   selectedItem: ContractData | null;
}

const initialState: ContractState = {
   data: {},
   selectedItem: null,
};

const ContractSlice = createSlice({
   name: 'contract ',
   initialState,
   reducers: {
      setData: (state, action: PayloadAction<{ [key: string]: ContractData } | null>) => {
         state.data = action.payload ?? {};
      },
      setSelectedItem: (state, action: PayloadAction<ContractData | null>) => {
         state.selectedItem = action.payload;
      },
   },
});

export const { setData, setSelectedItem } = ContractSlice.actions;

export default ContractSlice.reducer;


