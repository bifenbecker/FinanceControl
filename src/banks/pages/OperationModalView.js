import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import {edit_operation} from '../utils';


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
                prefix={"$"}
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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OperationModalView = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isIncome, setIsIncome] = React.useState(props.operation.isIncome);
    const [value, setValue] = React.useState(props.operation.value);
    const [date, setDate] = React.useState(props.operation.date);
    const [description, setDescription] = React.useState(props.operation.description);

    const editOperation = async () => {
        const request = await edit_operation;
        const response = await request({
            uuid: props.operation.uuid,
            isIncome,
            value,
            date,
            description
        });
        if(response !== undefined){
            const content = await response.json();
            props.setOperation(content);
        }
        
    }

    const OperationForm = <form>
                        <Box sx={{ '& button': { m: 1 } }} >
                            <h1 className="h3 m-5 mt-0 fw-normal">Operation</h1>
                            <div className="m-5">
                                <TextField
                                    onChange={e => {
                                        setIsVisible(true);
                                        setValue(e.target.value);
                                    }}
                                    label={props.operation.isIncome? `+${props.operation.value}`: `-${props.operation.value}`}
                                    defaultValue={props.operation.value}
                                    id="formatted-numberformat-input"
                                    variant="standard"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom
                                    }}
                                />
                            </div>
                            <div className="m-5">
                                <TextField
                                    disabled
                                    id="standard-required"
                                    label="Category"
                                    defaultValue={props.operation.category}
                                    variant="standard"
                                />
                            </div>
                            <div className="m-5">
                                <TextField
                                    disabled
                                    id="standard-required"
                                    label="Bill"
                                    defaultValue={props.operation.bill? props.operation.bill.name:null}
                                    variant="standard"
                                />
                            </div>
                            <div className="m-5">
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                defaultValue={props.operation.date}
                                sx={{ width: '100%' }}
                                onChange={e => {
                                    setIsVisible(true);
                                    setDate(e.target.value);
                                }}
                            />
                            </div>
                            <div className="m-5">
                                <TextField
                                    id="standard-required"
                                    label="Description"
                                    defaultValue={props.operation.description}
                                    variant="standard"
                                    onChange={e => {
                                        setIsVisible(true);
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>
                        </Box>
                    </form>
    return (
        <div>

        <Modal
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={() => setIsVisible(false)}
        >
            <Box sx={style}>
                {OperationForm}
                {isVisible?
                <Fab sx={{float: 'right'}} variant='Edit operation' color='secondary' onClick={editOperation}>
                    <EditIcon />
                </Fab>
                : null
                }
            </Box>
        </Modal>
        </div>
    );
}

export default OperationModalView;