import React from 'react';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';

import Tab from '@mui/material/Tab';

import AddOperationModal from './AddOperationModal';



const OperationsMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openAddOperationModal, setAddOperationModal] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAddOperationModal(false);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            
            <Tooltip title="Operations menu">
            <Tab onClick={handleClick} icon={<MenuIcon />} label="Operations" value="-" />
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
            <MenuItem onClick={e => setAddOperationModal(true)}>
            <ListItemIcon>
                <AddIcon fontSize="small" />
            </ListItemIcon>
            Add operation
            <AddOperationModal settings={props.settings} setNavValue={props.setNavValue} openModal={openAddOperationModal} setOpen={setAddOperationModal} handleClose={handleClose} />
            </MenuItem>
            <MenuItem onClick={e => {
                props.setNavValue('6');
                handleClose();
            }}>
            <ListItemIcon>
                <ViewListIcon fontSize="small" />
            </ListItemIcon>
            My operations
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}

export default OperationsMenu;