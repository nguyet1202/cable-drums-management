import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RequestData = {
   id?: string;
   planner_id?: string;
   contract_id: string;
   project_contractor_id: string;
   amount: number;
   supply_vendor_id: string;
   status: string;
   teamname: string;
   phonenumbers: number;
   email: string;
   project_contractor_name: string;
   project_contractor_phone: string;
   project_contractor_email: string;
   supply_vendor_name: string;
   supply_vendor_phone: string;
   supply_vendor_email: string;
   planner_name: string;
   planner_phone: string;
   planner_email: string;
};

type RequestState = {
   data: { [key: string]: RequestData };
   selectedItem: RequestData | null;
}

const initialState: RequestState = {
   data: {},
   selectedItem: null,
};

const RequestSlice = createSlice({
   name: 'request',
   initialState,
   reducers: {
      setDataRequest: (state, action: PayloadAction<{ [key: string]: RequestData } | null>) => {
         state.data = action.payload ?? {};
      },
      setSelectedItemRequest: (state, action: PayloadAction<RequestData | null>) => {
         state.selectedItem = action.payload;
      },
   },
});

export const { setDataRequest, setSelectedItemRequest } = RequestSlice.actions;

export default RequestSlice.reducer;
export {type RequestData}
