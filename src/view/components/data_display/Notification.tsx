import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {BiBell} from 'react-icons/bi';
import DrawerDisplay from "./DrawerDisplay";
import {setNotification} from "../../../store/slices/notificationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {equalTo, orderByChild, query, ref,onValue} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";

const Notification = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const dispatch = useDispatch();

    const userID = useSelector((state: RootState) => state.user.data.teamID);

    const role = useSelector((state: RootState) => state.user.data.role);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        const getNotificationsByUserRole = () => {
            let queryPath;
            if (role === 'planner') {
                queryPath = 'planner_id';
            } else if (role === 'supply_vendors') {
                queryPath = 'supply_vendor_id';
            } else if (role === 'project_contractors') {
                queryPath = 'project_contractor_id';
            }
            if (queryPath && userID) {
                const requestsRef = ref(database, 'notification');
                const requestsQuery = query(requestsRef, orderByChild(queryPath), equalTo(userID));
                onValue(requestsQuery, (snapshot) => {
                    const notifications = snapshot.val();
                    console.log(notifications)
                    dispatch(setNotification(notifications));
                });
            }
        };

        getNotificationsByUserRole();
    }, [role, userID]);

    return (
        <Box sx={{color: 'action.active'}}>
            <Badge color="secondary" variant="dot" className="hover:bg-gray-200">
                <BiBell
                    onClick={handleDrawerOpen}
                    size={30}
                    className="text-D1 focus:outline-none cursor-pointer"
                />
            </Badge>
            <DrawerDisplay open={isDrawerOpen} onClose={handleDrawerClose} />
        </Box>
    );
};
export default Notification;

