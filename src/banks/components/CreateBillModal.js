import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CreateBill from '../pages/CreateBill';



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

const CreateBillModal = (props) => {
    return (
        <div>

        <Modal
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <CreateBill settings={props.settings?props.settings: undefined} setOpen={props.setOpen}/>
            </Box>
        </Modal>
        </div>
    );
}

export default CreateBillModal;