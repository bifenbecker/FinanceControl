import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { get_currencies } from '../utils';


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

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    React.useEffect(() => {
        (
            async () => {
                const response = await get_currencies();
                const content = await response.json();
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
                        currencyList.map(currency => {
                            return <MenuItem value={currency.name}>{currency.name + " - " + currency.char}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            </Box>
        </Modal>
        </div>
    );
}

export default SettingsModal;