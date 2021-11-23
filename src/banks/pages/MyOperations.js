import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import { my_operations } from '../utils';

import OperationPrev from '../components/OperationPrev';
import ListOperations from '../components/ListOperations';
import OperationModalView from '../pages/OperationModalView';

const MyOperations = (props) => {
    const [operations, setOperations] = useState(undefined);
    const [openOperationModal, setOperationModal] = React.useState(false);
    const [selectedOperation, setSelectedOperation] = React.useState(undefined);
    
    const handleClose = () => {
        setOperationModal(false);
    }

    useEffect(() => {
        (
            async () => {
                const response = await my_operations();
                const content = await response.json();

                setOperations(content.map((operation) => {return operation}))
            }
        )();
    }, []);

    return (
        <div>
            <ListOperations operations={operations} />
        </div>
    );
}

export default MyOperations;