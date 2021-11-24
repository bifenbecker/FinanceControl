import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function StatTable(props) {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>CATEGORY</TableCell>
                <TableCell align="right">VALUE</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                
            {props.rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}