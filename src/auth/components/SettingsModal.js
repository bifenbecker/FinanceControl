import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { get_currencies, update_settings } from '../utils';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SettingsModal = (props) => {
    const [currency, setCurrency] = React.useState(undefined);
    const [currencyList, setCurrencyList] = React.useState(undefined);

    const handleChange = async (event) => {
        setCurrency(event.target.value);
        const request = await update_settings;
        const response = await request({
            currency: event.target.value
        })
        if(response !== undefined){
            const content = await response.json();
            if(response.status === 200){
                props.user.settings.currency = content.currency;
                localStorage.setItem('access_token', content.access_token);
                localStorage.setItem('refresh_token', content.refresh_token);
            }
        }
        
        
    };

    React.useEffect(() => {
        (
            async () => {
                let response = await get_currencies();
                let content = await response.json();
                setCurrencyList(content.map((cur) => {
                    return {name: cur.name, char: cur.char}
                }))
                
            }
        )();
    }, [])

    return (
        <div>

        <Modal
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    defaultValue={props.user.settings.currency.name}
                    label="Currency"
                    onChange={handleChange}
                >
                    {
                        currencyList !== undefined?
                        currencyList.map(currency => {
                            return <MenuItem value={currency.name}>{currency.name + " - " + currency.char}</MenuItem>
                        })
                        : null
                    }
                </Select>
            </FormControl>
            </Box>
        </Modal>
        </div>
    );
}

export default SettingsModal;