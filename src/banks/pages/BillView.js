import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import { ThemeProvider } from '@mui/system';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import Zoom from '@mui/material/Zoom';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { green, deepOrange } from '@mui/material/colors';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import EditBill from '../components/EditBill';
import AddOperationModal from '../components/AddOperationModal';

import { operations_of_bill, edit_bill, convertValue } from '../utils';
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


const BillView = (props) => {
    
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [openAddOperationModal, setAddOperationModal] = React.useState(false);

    const [newName, setNewName] = useState(undefined);
    const [newBalance, setNewBalance] = useState(undefined);

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
                const request = await operations_of_bill;
                const response = await request(props.bill.uuid);
                if(response !== undefined){
                    const content = await response.json();
                    setOperations(content.map((operation) => {
                        var convertedValue = convertValue(operation.currency, props.settings.currency.name, operation.value);
                        var currencyChar = props.settings.currency.char;
                        operation['convertedValue'] = convertedValue;
                        operation['char'] =  currencyChar
                        return operation;
                    }))
                    let income_operations = content.filter((value) => value.isIncome === true);
                    let payment_operations = content.filter((value) => value.isIncome === false);
                    if(income_operations.length > 0){
                        setIncomeValue(income_operations.map((operation) => Number(operation.convertedValue)).reduce((acc, value) => acc + value));
                    }
                    if(payment_operations.length > 0){
                        setPaymentValue(payment_operations.map((operation) => Number(operation.convertedValue)).reduce((acc, value) => acc + value));
                    }
                    
                    
                }
                }
        )();
    }, []);
    

    const editBill = async () => {
        if(newName !== undefined && newBalance !== undefined) {
            const request = await edit_bill;
            const response = await request({
                name: newName,
                balance: newBalance
            })
            if(response !== undefined){
                const content = await response.json();
                props.setActiveBill(content);
            }
            
        }
    }
    const downloadStatistic = () => {
        const rows = [
            ['Category', 'Income/Payment', `Value(${props.settings.currency.char})`, 'Description', 'Date(mm/dd/yyyy)']
        ];
        operations.map((operation) => {
            let row = [operation.category !== null? operation.category: "No category", operation.isIncome? "Yes": "No", operation.convertedValue, operation.description, operation.date];
            rows.push(row);
        })
        
        let csvContent = "data:text/csv;charset=utf-8," 
            + rows.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            onClick: editBill
        }
    ];

    var convertedCurrentBalance = convertValue(props.bill.currency, props.settings.currency.name, props.bill.balance);
    var convertedStartBalance = convertValue(props.bill.currency, props.settings.currency.name, props.bill.start_balance);
    var stat = ((convertedCurrentBalance - convertedStartBalance)/100).toFixed(2);
    var currencyChar = props.settings.currency.char;

    return (
        <div>
            <AddOperationModal settings={props.settings} openModal={openAddOperationModal} setOpen={setAddOperationModal} handleClose={handleClose} bill={props.bill} setNavValue={props.setNavValue}/>
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
                    Balance: {convertedCurrentBalance + currencyChar}
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 13 }}>
                    Start balance: {convertedStartBalance + currencyChar + " - " + props.bill.start_balance + ` (${props.bill.currency})`}
                    </Box>
                    <Box sx={{ color: stat > 0? green[300]: deepOrange[400], fontSize: 15, fontWeight: 600 }}>
                    {stat > 0? "+" + stat: stat}%
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
                                <TableCell>{incomeValue? incomeValue.toFixed(2): null}</TableCell>
                                <TableCell>{paymentValue? paymentValue.toFixed(2): null}</TableCell>
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
                            <ListOperations user={props.user} operations={operations} />
                        </TabPanel>
                        <TabPanel
                            value={value} index={1} dir={theme.direction}
                        >
                            <StatisticOfOperations operations={operations} />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <EditBill convertedBalance={convertedCurrentBalance} settings={props.settings} bill={props.bill} setNewName={setNewName} setNewBalance={setNewBalance}/>
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