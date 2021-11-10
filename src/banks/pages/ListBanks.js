import React, {useEffect, useState} from 'react';
import { bank_list } from '../utils';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';

const Bank = (props) => {

    const theme = createTheme({
        palette: {
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


    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        m: 1,
                        p: 1,
                        width: '8rem',
                        height: '5rem',
                    }}
                >
                    <Box sx={{ color: 'text.secondary' }}>{props.bank.name}</Box>
                    <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
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
                    <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
                    
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}


const ListBanks = (props) => {
    const [bankList, setBankList] = useState(undefined);

    useEffect(() => {
        (
            async () => {
                const response = await bank_list();
                const content = await response.json();
                if(response.status === 401){
                    window.location.reload();
                }
                else if(response.status === 200){
                    setBankList(content.map((bank) => <Bank bank={bank}/>));
                } 
            }
        )();
    }, []);

    return (
        <div>
            List
            {bankList}
        </div>
    );
}

export default ListBanks;