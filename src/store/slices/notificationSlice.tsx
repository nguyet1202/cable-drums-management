import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification ={
   id: string;
   requestId: string;
   supply_vendor_id: string;
   project_contractor_id: string;
   planner_id:string,
   message:string,
}

interface NotificationState {
   notifications: Notification[];
}

const initialState: NotificationState = {
   notifications: [],
};

const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      addNotification(state, action: PayloadAction<Notification>) {
         state.notifications.push(action.payload);
      },
      clearNotification(state, action: PayloadAction<string>) {
         state.notifications = state.notifications.filter(
            (notification) => notification.id !== action.payload
         );
      },
   },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const selectNotificationsCount = (state: { notification: NotificationState }) =>
   state.notification.notifications.length;


export default notificationSlice.reducer;
export {type Notification}
