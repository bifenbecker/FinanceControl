import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';




const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openProfileModal, setOpenProfileModal] = React.useState(false);
    const [openSettingsModal, setOpenSettingsModal] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setOpenProfileModal(false);
        setOpenSettingsModal(false);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 15,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={e => setOpenProfileModal(true)}>
            <Avatar /> Profile
            <ProfileModal openModal={openProfileModal} setOpen={setOpenProfileModal} handleClose={handleClose} user={props.user} setUser={props.setUser}/>
            </MenuItem>
            <Divider />
            <MenuItem onClick={e => setOpenSettingsModal(true)}>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>Settings
            <SettingsModal openModal={openSettingsModal} setOpen={setOpenSettingsModal} handleClose={handleClose} user={props.user} setUser={props.setUser}/>
            </MenuItem>
            <MenuItem onClick={props.logout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}

export default ProfileMenu;