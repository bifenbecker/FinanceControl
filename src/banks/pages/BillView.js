import React, {useEffect, useState} from 'react';

import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import { green, purple } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Zoom from '@mui/material/Zoom';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import EditBill from '../components/EditBill';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
        bgcolor: green[600],
    },
};


const Bill = (props) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const addOperation = () => {
        props.setNavValue('6');
    }

    const editBank = () => {
        console.log(2);
    }

    const fabs = [
        {
            color: 'primary',
            sx: fabStyle,
            icon: <AddIcon />,
            label: 'Add operation',
            onClick: addOperation,
        },
        {
            color: 'secondary',
            sx: fabStyle,
            icon: <EditIcon />,
            label: 'Edit bank',
            onClick: editBank
        }
    ];

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        m: 1,
                        p: 1
                    }}
                >
                    <Box sx={{ color: 'text.secondary', fontSize: 25, fontWeight: 'medium' }}>
                        {props.bank.name}
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 22 }}>
                    Balance: {props.bank.balance}
                    </Box>
                    
                </Box>
            </ThemeProvider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
                >
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        width: 500,
                        position: 'relative',
                        minHeight: 200,
                    }}
                    >
                    <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                        >
                        <Tab label="My operations" {...a11yProps(0)} />
                        <Tab label="Edit bank" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            List of operations
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <EditBill bank={props.bank}/>
                        </TabPanel>
                    </SwipeableViews>
                    {fabs.map((fab, index) => (
                        <Zoom
                            key={fab.color}
                            in={value === index}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                            }}
                            unmountOnExit
                        >
                            <Fab variant={fab.label}  aria-label={fab.label} color={fab.color} onClick={fab.onClick}>{/* sx={fab.sx} */}
                                {fab.icon}
                            </Fab>
                            
                        </Zoom>
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default Bill;