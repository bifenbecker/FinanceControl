import * as React from 'react';
import Box from '@mui/material/Box';
import { blue, grey } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { convertValue } from '../utils';


const BillList = (props) => {
    // In modal view

    const handleListItemClick = (event, bill) => {
        props.setBill(bill);
        props.handleClose();
    };
    let list;

    
    if(props.billList[0] !== undefined) {
        
        list = props.billList.map((bill) => {
            // let convertedBalance = convertValue(props.bill.currency, props.settings.currency.name, props.bill.balance) + props.settings.currency.char;
            return (
                <ListItemButton
                onClick={(event) => handleListItemClick(event, bill)}
                >
                    <ListItemText 
                        primaryTypographyProps={{
                            fontSize: 19,
                            fontWeight: 600,
                            letterSpacing: 0,
                            color: blue[50],
                            ml: 2
                        }}
                        secondaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 400,
                            letterSpacing: 0,
                            color: grey[800],
                            ml: 3
                        }}
                        primary={bill.name} 
                        secondary={"Current balance: " + bill.balance}
                    />
                </ListItemButton>
            
            )
        })
    }
    else{
        list = null;
    }

    return (
        <Box sx={{ width: '100%', height: '80%', maxWidth: 360, bgcolor: '#52958B', fontWeight: 800, mb: 2 }} >
            <List
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 360,
                    bgcolor: '#52958B',
                    // position: 'relative',
                    overflow: 'auto',
                    maxHeight: '100%',
                    '& ul': { padding: 0 },
                    
                }}
                component="nav"
                aria-label="secondary category list"
            >
                {
                    list
                }
            </List>
        
        </Box>
        
    );
}

export default BillList;