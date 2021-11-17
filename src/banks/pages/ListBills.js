import React, {useEffect, useState} from 'react';
import { bill_list } from '../utils';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import { green, purple } from '@mui/material/colors';

const BillPrev = (props) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: purple[500],
            },
            background: {
                paper: '#fff',
            },
            text: {
                primary: '#173A5E',
                secondary: '#46505A',
            },
            action: {
                active: '#001E3C',
            },
            success: {
                dark: '#009688',
            },
        },
    });

    const select = () => {
        props.setActiveBank(props.bank);
        props.setValue("3");
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        m: 1,
                        p: 1,
                        
                    }}
                >
                    <Box sx={{ color: 'text.secondary', fontSize: 25, fontWeight: 'medium' }}
                        onClick={select}
                    >
                        {props.bank.name}
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 22 }}>
                    {props.bank.balance}
                    </Box>
                    <Box
                    sx={{
                        color: 'success.dark',
                        display: 'inline',
                        fontWeight: 'medium',
                        mx: 0.5,
                    }}
                    >
                    +18.77%
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}


const ListBills = (props) => {
    const [bankList, setBankList] = useState(undefined);

    useEffect(() => {
        (
            async () => {
                const response = await bill_list();
                const content = await response.json();
                if(response.status === 401){
                    window.location.reload();
                }
                else if(response.status === 200){
                    setBankList(content.map((bank) => <BillPrev bank={bank} setValue={props.setValue} setActiveBank={props.setActiveBank}/>));
                } 
            }
        )();
    }, []);

    return (
        <div>
            <Box sx={{ color: 'text.primary', fontSize: 28, fontWeight: 'medium' }}>
                My bills
            </Box>
            {bankList}
        </div>
    );
}

export default ListBills;