import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import BillList from './BillList';

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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: '#128277',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const ChooseBillModal = (props) => {
    const [name, setBillNameCreate] = React.useState('');
    const [balance, setBillBalanceCreate] = React.useState(0.0);
    const [isClickedCreateBill, setIsClickedCreateBill] = React.useState(false);

    const handleClose = () => {
        props.setOpen(false);
    }

    const show = () => {
        if(isClickedCreateBill === true) {
            setIsClickedCreateBill(false);
        }
        else{
            setIsClickedCreateBill(true)
        }
    }
    
    const add_bill = async (e) => {
        if(name !== ""){
            const response = await create_bill({
                name,
                balance
            })
            const content = await response.json();
            props.billList.push(content);
        }
        setIsClickedCreateBill(false);
    }

    return (
        <div>

        <Modal
            open={props.openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <BillList settings={props.settings? props.settings: undefined} handleClose={handleClose} billList={props.billList} setBill={props.setBill}/>
                
                {
                    isClickedCreateBill?
                    <Box>
                        <Fab sx={{ color: 'success.dark', bgcolor: '#B9C4C9', mr: 3}} aria-label="add" onClick={add_bill}>
                        <AddIcon />
                        </Fab>
                        <Box>
                            <TextField
                                value={name}
                                label="Create Bill"
                                onChange={e => setBillNameCreate(e.target.value)}
                                id="formatted-numberformat-input"
                                variant="standard"
                                color="error"
                            />
                            <TextField
                                label="Start balance"
                                value={balance}
                                onChange={e => setBillBalanceCreate(e.target.value)}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                InputProps={{
                                inputComponent: NumberFormatCustom,
                                }}
                                variant="standard"
                            />
                        </Box>
                    </Box>
                    : 
                    <Fab sx={{ color: 'success.dark', bgcolor: '#B9C4C9', mr: 3}} aria-label="add" onClick={show}>
                        <AddIcon />
                    </Fab>
                }
                
            </Box>
        </Modal>
        </div>
    );
}

export default ChooseBillModal;