import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import { my_operations, convertValue } from '../utils';

import ListOperations from '../components/ListOperations';


const MyOperations = (props) => {
    const [operations, setOperations] = useState(undefined);

    useEffect(() => {
        (
            async () => {
                const request = await my_operations;
                const response = await request();
                if(response !== undefined){
                    const content = await response.json();

                    setOperations(content.map((operation) => {
                        var convertedValue = convertValue(operation.currency, props.settings.currency.name, operation.value);
                        var currencyChar = props.settings.currency.char;
                        operation['convertedValue'] = convertedValue;
                        operation['char'] =  currencyChar
                        return operation;
                    }))
                }
                
            }
        )();
    }, []);
    
    return (
        <Box sx={{ width: 500 }}>
            <ListOperations operations={operations}/>
        </Box>
        
    );
}

export default MyOperations;