import * as React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Tooltip from '@mui/material/Tooltip';
import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';

import CreateBillModal from './CreateBillModal';
import Tab from '@mui/material/Tab';


const BillsMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openCreateBillModal, setCreateBillModal] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setCreateBillModal(false);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Bills menu">
            <Tab onClick={handleClick} icon={<AccountBalanceIcon />} label="Bills" value="-" />
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
                right: 14,
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
            <MenuItem onClick={e => setCreateBillModal(true)}>
            <ListItemIcon>
                <CreateIcon fontSize="small" />
            </ListItemIcon>
            Create bill
            <CreateBillModal settings={props.settings?props.settings: undefined} openModal={openCreateBillModal} setOpen={setCreateBillModal} handleClose={handleClose}/>
            </MenuItem>
            <MenuItem onClick={e => {
                props.setNavValue('4');
                handleClose();
            }}>
            <ListItemIcon>
                <ViewListIcon fontSize="small" />
            </ListItemIcon>
            List
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}

export default BillsMenu;