import * as React from 'react';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';


import ListOperations from './ListOperations';



export default function StatisticOfOperations(props) {
    const [navValue, setNavValue] = React.useState('1');
    const [isIncome, setIsIncome] = React.useState(false);



    return (
        <TabContext value={navValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={(e, value) => setNavValue(value)} aria-label="lab API tabs example">
                    <Tab label="PAYMENT" value="1" onClick={e => {
                        setIsIncome(false);
                        }}/> 
                    <Tab label="INCOME" value="2" onClick={e => {
                        setIsIncome(true);
                    }}/>
                </TabList>
            </Box>
            <TabPanel value="1">
                <TableContainer>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>CATEGORY</TableCell>
                        <TableCell>PAYMENT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>1</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                <ListOperations operations={props.operations.filter(operation => operation.isIncome === false)} />
            </TabPanel>
            <TabPanel value="2">
                <TableContainer>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>CATEGORY</TableCell>
                        <TableCell>INCOME</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>1</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                <ListOperations operations={props.operations.filter(operation => operation.isIncome === true)} />
            </TabPanel>
        </TabContext>
        
        
    );
}