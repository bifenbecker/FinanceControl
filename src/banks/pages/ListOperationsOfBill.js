import React, {useEffect, useState} from 'react';
import { operations_of_bill } from '../utils';
import Box from '@mui/material/Box';
import { blue, grey, green, deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import OperationModalView from './OperationModalView';


const ListOperationsOfBill = (props) => {
    const [operations, setOperations] = useState(undefined);
    const [openOperationModal, setOperationModal] = React.useState(false);
    const [selectedOperation, setSelectedOperation] = useState(undefined);
    
    const handleClose = () => {
        setOperationModal(false);
    }

    useEffect(() => {
        (
            async () => {
                const response = await operations_of_bill(props.bill.uuid);
                const content = await response.json();
                setOperations(content.map((operation) => {
                    return (
                        <List
                            sx={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                                bgcolor: 'white',
                                // position: 'relative',
                                overflow: 'auto',
                                maxHeight: '100%',
                                '& ul': { padding: 0 },
                                
                            }}
                            component="nav"
                            aria-label="secondary category list"
                        >
                            <ListItemButton onClick={e => {
                                setOperationModal(true);
                                setSelectedOperation(operation)
                            }}>
                            <ListItemText 
                                primaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: 300,
                                    letterSpacing: 0,
                                    color: blue[900],
                                    ml: 2
                                }}
                                secondaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    letterSpacing: 0,
                                    color: grey[900],
                                    ml: 2
                                }}
                                primary={operation.date} 
                                secondary={operation.category? operation.category: "No category"}
                            />
                            <ListItemText 
                                sx={{
                                    display: "flex"
                                }}
                                primaryTypographyProps={{
                                    fontSize: 19,
                                    fontWeight: 600,
                                    letterSpacing: 0,
                                    color: operation.isIncome? green[300] : deepOrange[400],
                                    ml: 2
                                }}
                                primary={operation.isIncome? "+" + operation.value: "-" + operation.value} // TODO: load currency
                            />
                        </ListItemButton>
                        <Divider />
                        </List>
                    )
                }))
            }
        )();
    }, []);

    return (
        <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: '#e0e0e0', fontWeight: 800, mb: 2 }} >
            {selectedOperation !== undefined ? 
            <OperationModalView openModal={openOperationModal} setOpen={setOperationModal} handleClose={handleClose} operation={selectedOperation} bill={props.bill}/>
            : null
            }
            
            {operations}
        </Box>
    );
}

export default ListOperationsOfBill;