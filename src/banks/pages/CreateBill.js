import React, {SyntheticEvent, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { create_bill } from '../utils';


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



const CreateBill = (props) => {
    const [name, setBankName] = React.useState('');
    const [balance, setBankBalance] = React.useState(0.0);
    const [error, setError] = React.useState('');
    
    const validate = (name, balance) => {
        if(name === ''){
            setError('Name is empty');
            return false;
        }
        else if(name.length > 15){
            setError('Name is too long');
            return false;
        }

        if(balance < 0){
            setError('Balance must be positive');
            return false;
        }
        else if(balance > 999999999 || balance.length > 9){
            setError('Incorrect balance');
            return false;
        }

        return true;
    }

    const submit = async () => {
        if(validate(name, balance)){
            const response = await create_bill({
                name,
                balance
            })
            props.setOpen(false);
            if(response.status === 200 || response.status === 202){
                setError('');
            }
            else if(response.status === 401){
                window.location.reload();
            }
            else{
                const content = await response.json();
                setError(content);
            }
        }
    }

    return (
        <div className="p-5">
            <h1 className="h3 m-5 mt-0 fw-normal">Create bill</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                >
                <div className="mb-5">
                    <TextField
                        required
                        id="outlined-required"
                        label="Name Required"
                        placeholder="Name"
                        // helperText={errorUserName}
                        onChange={e => setBankName(e.target.value)} 
                    />
                </div>
                
                <div className="mb-5">
                    <TextField
                        label="Start balance"
                        value={balance}
                        onChange={e => setBankBalance(e.target.value)}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        InputProps={{
                        inputComponent: NumberFormatCustom,
                        }}
                        variant="standard"
                    />
                </div>
                
            </Box>
            <div class="row">
                <div class="col text-center">
                <Button variant="outlined" onClick={submit}>CREATE</Button>
                <p className="mt-5">
                    {error !== ''? error: ''}
                </p>
                </div>
            </div>
        </div>
    );
}

export default CreateBill;