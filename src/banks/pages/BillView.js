import React, {useEffect, useState} from 'react';

import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import { green, purple } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Zoom from '@mui/material/Zoom';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditBill from '../components/EditBill';
import AddOperationModal from '../components/AddOperationModal';

import { operations_of_bill } from '../utils';
import ListOperations from '../components/ListOperations';
import StatisticOfOperations from '../components/StatisticOfOperations';




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

function get_stat(operations) {
    var income = 0;
    var payment = 0;
    console.log(operations)
    for (var i = 0; i < operations.length; i++) {
        if(operations[i].isIncome === true) {
            try{
                income += Number(operations[i].value);
            }
            catch{
                continue;
            }
        }
        else{
            try{
                payment += Number(operations[i].value);
            }
            catch{
                continue;
            }
            
        }
    }
    return [income, payment];
}

const BillView = (props) => {
    
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [openAddOperationModal, setAddOperationModal] = React.useState(false);

    const handleClose = (e) => {
        setAddOperationModal(false);
    }
    const addOperationModal = () => {
        setAddOperationModal(true);
    }

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

    const [operations, setOperations] = useState(undefined);
    const [incomeValue, setIncomeValue] = useState(undefined);
    const [paymentValue, setPaymentValue] = useState(undefined);
    useEffect(() => {
        (
            async () => {
                const response = await operations_of_bill(props.bill.uuid);
                const content = await response.json();
                setOperations(content.map((operation) => {
                    return operation
                }))
                setIncomeValue(content.filter((value) => value.isIncome === true).map((operation) => Number(operation.value)).reduce((acc, value) => acc + value));
                setPaymentValue(content.filter((value) => value.isIncome === false).map((operation) => Number(operation.value)).reduce((acc, value) => acc + value));
            }
        )();
    }, []);
    

    const editBank = () => {
        console.log(2);
    }
    const downloadStatistic = () => {
        console.log(2);
    }

    const fabs = [
        {
            color: 'primary',
            sx: fabStyle,
            icon: <AddIcon />,
            label: 'Add operation',
            onClick: addOperationModal,
        },
        {
            color: 'primary',
            sx: fabStyle,
            icon: <DownloadIcon />,
            label: 'Download statistic',
            onClick: downloadStatistic,
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
            <AddOperationModal openModal={openAddOperationModal} setOpen={setAddOperationModal} handleClose={handleClose} bill={props.bill} setNavValue={props.setNavValue}/>
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
                        {props.bill.name}
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 22 }}>
                    Balance: {props.bill.balance}
                    </Box>
                    <TableContainer>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>INCOME</TableCell>
                            <TableCell>PAYMENT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{incomeValue}</TableCell>
                                <TableCell>{paymentValue}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
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
                        width: '40%',
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
                        
                        <Tab label="Operations" {...a11yProps(0)} />
                        <Tab label="Statistic" {...a11yProps(1)} />
                        <Tab label="Edit bill" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        
                        <TabPanel
                            value={value} index={0} dir={theme.direction}
                        >
                            <ListOperations operations={operations} />
                        </TabPanel>
                        <TabPanel
                            value={value} index={1} dir={theme.direction}
                        >
                            <StatisticOfOperations operations={operations} />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <EditBill bill={props.bill}/>
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

export default BillView;