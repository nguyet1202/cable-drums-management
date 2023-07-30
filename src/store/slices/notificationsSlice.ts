import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationProps = {
    id: string;
    message: string;
    planner_id: string;
    project_contractor_id: string;
    requestId: string;
    supply_vendor_id: string;
    created_at: string;
};

type NotificationState = {
    data: { [key: string]: NotificationProps };
}

const initialState: NotificationState = {
    data: {},
};

const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<{ [key: string]: NotificationProps } | null>) => {
            state.data = action.payload ?? {};
        }
    },
});

export const { setNotification } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
export {type NotificationProps}
