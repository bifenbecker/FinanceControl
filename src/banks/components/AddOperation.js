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
            prefix={props.defaultValue + "$"}
        />
    );
    });
    
    NumberFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };


export default function AddOperation(props) {
    const [isIncome, setIsIncome] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [bank, setBank] = React.useState(undefined);
    const [date, setDate] = React.useState(new Date());
    const [description, setDescription] = React.useState('');
    
    return (
        <form>
            <Box sx={{ '& button': { m: 1 } }}>
                <div className="m-5">
                    <TextField
                        label="Value"
                        defaultValue={isIncome? "+" : "-" + value}
                        onChange={e => setValue(e.target.value)}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                            isIncome: isIncome,
                        }}
                        variant="standard"
                    />
                </div>
                <div className="m-5">
                    <TextField
                        id="standard-required"
                        label="Category"
                        defaultValue={category}
                        variant="standard"
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>
                {/* //TODO: Change on select */}
                <div className="m-5">
                    <TextField
                        id="standard-required"
                        label="Bank"
                        defaultValue={bank}
                        variant="standard"
                        onChange={e => setBank(e.target.value)}
                    />
                </div>
                {/* //TODO: Change on date */}
                <div className="m-5">
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue={date}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </div>
                <div className="m-5">
                    <TextField
                        id="standard-required"
                        label="Description"
                        defaultValue={description}
                        variant="standard"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                

            </Box>
        </form>
    );
}