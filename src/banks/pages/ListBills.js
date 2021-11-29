import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Grid from '@mui/material/Grid';

import { bill_list, convertValue } from '../utils';


const BillPrev = (props) => {

    const select = () => {
        props.setActiveBill(props.bill);
        props.setValue("5");
    }

    return (
        <List
            sx={{
                width: '100%',
                height: '50%',
                bgcolor: 'white',
                position: 'relative',
                overflow: 'auto',
                maxHeight: '100%',
                
                '& ul': { padding: 0 },
                
            }}
            component="nav"
            aria-label="secondary category list"
        >
            <Grid container spacing={2}>
            <Grid item xs={5}>
                
            </Grid>
            <Grid item xs={2}>
                <ListItemButton
                    onClick={select}
                    divider={true}
                    alignItems='center'
                >
                    <ListItemText 
                        primaryTypographyProps={{
                            fontSize: 16,
                            fontWeight: 300,
                            letterSpacing: 0,
                            ml: 2
                        }}
                        secondaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 600,
                            letterSpacing: 0,
                            ml: 2
                        }}
                        primary={props.bill.name} 
                        secondary={convertValue(props.bill.currency, props.settings.currency.name, props.bill.balance) + props.settings.currency.char}
                    />
                </ListItemButton>
            </Grid>
            <Grid item xs={5}>
                
            </Grid>
            </Grid>
        </List>
    );
}


const ListBills = (props) => {
    const [billList, setBillList] = useState(undefined);

    useEffect(() => {
        (
            async () => {
                const request = await bill_list;
                const response = await request();
                if(response !== undefined){
                    const content = await response.json();
                    if(response.status === 401){
                        window.location.reload();
                    }
                    else if(response.status === 200){
                        setBillList(content.map((bill) => <BillPrev settings={props.settings} bill={bill} setValue={props.setValue} setActiveBill={props.setActiveBill}/>));
                    } 
                }
            }
        )();
    }, []);

    return (
        <div>
            <Box sx={{ color: 'text.primary', fontSize: 28, fontWeight: 'medium' }}>
                My bills
            </Box>
            {billList}
        </div>
    );
}

export default ListBills;