import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import NumberFormatCustom from './NumberFormatInput'


export default function EditBill(props) {
    return (
        <form ref={props.formRef}>
            <Box sx={{ '& button': { m: 1 } }}>
                <div className="m-5">
                    <TextField
                        id="standard-required"
                        label="Name"
                        defaultValue={props.bill.name}
                        variant="standard"
                        onChange={e => props.setNewName(e.target.value)}
                    />
                </div>

                <div className="m-5">
                    <TextField
                        label="Balance"
                        defaultValue={props.convertedBalance}
                        onChange={e => props.setNewBalance(e.target.value)}
                        name={props.settings.currency.char}
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