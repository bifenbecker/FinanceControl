import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import NumberFormatCustom from '../components/NumberFormatInput';

import { create_bill } from '../utils';





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
            const request = await create_bill;
            const response = await request({
                name,
                balance
            })
            if(response !== undefined){
                
                if(response.status === 200 || response.status === 202){
                    setError('');
                }
                else if(response.status === 401){
                    window.location.reload();
                }
                else{
                    const content = await response.json();
                    setError(content['msg']);
                }
            }
            props.setOpen(false);
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
                        name={props.settings?props.settings.currency.char: null}
                        id="formatted-numberformat-input"
                        InputProps={{
                        inputComponent: NumberFormatCustom,
                        }}
                        variant="standard"
                    />
                </div>
                
            </Box>
            <div className="row">
                <div className="col text-center">
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