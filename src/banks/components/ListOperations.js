import React, {useEffect, useState} from 'react';
import { operations_of_bill } from '../utils';
import Box from '@mui/material/Box';
import { blue, grey, green, deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import OperationModalView from '../pages/OperationModalView';
import OperationPrev from './OperationPrev';


const ListOperations = (props) => {
    const [openOperationModal, setOperationModal] = React.useState(false);
    const [selectedOperation, setSelectedOperation] = useState(undefined);
    
    const handleClose = () => {
        setOperationModal(false);
    }
    return (
        <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: '#e0e0e0', fontWeight: 800, mb: 2 }} >
            {selectedOperation !== undefined ? 
            <OperationModalView openModal={openOperationModal} setOpen={setOperationModal} handleClose={handleClose} operation={selectedOperation}/>
            : null
            }
            {props.operations? 
                props.operations.map((operation) => <OperationPrev operation={operation} setSelectedOperation={setSelectedOperation} setOperationModal={setOperationModal}/>)
            : null
            }
        </Box>
    );
}

export default ListOperations;