import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import { my_operations } from '../utils';

import ListOperations from '../components/ListOperations';


const MyOperations = (props) => {
    const [operations, setOperations] = useState(undefined);

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
        <Box sx={{ width: 500 }}>
            <ListOperations operations={operations} />
        </Box>
        
    );
}

export default MyOperations;