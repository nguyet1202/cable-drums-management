import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import {Text, Button} from "../../base_component";
import {Close} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

type DrawerProps = {
    open: boolean;
    onClose: () => void;
};

const DrawerDisplay = (props: DrawerProps) => {

    const data = useSelector((state: RootState) => state.notifications.data);

    const Notifications = data
        ? Object.keys(data)
            .map(key => data[key])
            .reverse()
        : [];
    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        props.onClose();
    };
    const list = (anchor: 'right') => (
        <Box
            sx={{width: 360}}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <Toolbar sx={{backgroundColor: '#3975EB'}}>
                <Text size={'xl'} color={'white'} weight={'medium'}>
                    NOTIFICATION
                </Text>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        color: '#F6F6F6',
                    }}
                    onClick={toggleDrawer}
                >
                    <Close sx={{fontSize: '35px'}}/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List>
                {Notifications.length === 0 ? (
                    <Text>No notification</Text>
                ) : (
                    Notifications.map(notification => (
                        <div className="px-5 relative" key={notification.id}>
                            <Text wrapperStyles="absolute text-end z-10 right-10 top-3" size="sm" color="black">
                                {notification.created_at}
                            </Text>
                            <Button
                                size="xxs"
                                theme="NotificationBtn"
                                wrapperStyles="py-[40px] border-[1px] border-B2 mb-5"
                                label={notification.message}
                            ></Button>
                        </div>
                    ))
                )}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer anchor="right" open={props.open} onClose={toggleDrawer}>
                {list('right')}
            </Drawer>
        </div>
    );
}

export default DrawerDisplay
