import React, {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    
    return (
        <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
            onChange({
                target: {
                name: props.name,
                value: values.value,
                },
            });
        }}
            thousandSeparator
            isNumericString
            prefix="$" //TODO: Load from settings 
        />
    );
    });
    
    NumberFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };


export default function EditBank(props) {
    const [newName, setNewName] = useState('');
    const [newBalance, setNewBalance] = useState('');


    return (
        <form ref={props.formRef}>
            <Box sx={{ '& button': { m: 1 } }}>
                <div className="m-5">
                    <TextField
                        id="standard-required"
                        label="Name"
                        defaultValue={props.bank.name}
                        variant="standard"
                        onChange={e => setNewName(e.target.value)}
                    />
                </div>

                <div className="m-5">
                    <TextField
                        label="Balance"
                        defaultValue={props.bank.balance}
                        onChange={e => setNewBalance(e.target.value)}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        InputProps={{
                        inputComponent: NumberFormatCustom,
                        }}
                        variant="standard"
                    />
                </div>

            </Box>
        </form>
    );
}