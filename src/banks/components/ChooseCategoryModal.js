import * as React from 'react';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import {category_list} from '../utils'

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

const ChooseCategoryModal = (props) => {
    const [categoryList, setCategoryList] = useState([]);

    const handleClose = () => {
        props.setOpen(false);
    }
    useEffect(() => {
        (
            async () => {
                if(localStorage.getItem('access_token') !== null){
                    const response = await category_list();
                    
                    if(response.status === 200){
                        const content = await response.json();
                        setCategoryList(content.map((category) => {
                            if(props.isIncome === category.isIncome){
                                return <div onClick={e => props.setCategory(e.target.value)}>{category.name}</div>
                            }
                        }));
                    }
                }
            
            
            }
        )();
  }, []);

    return (
        <div>

        <Modal
            open={props.openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {categoryList}
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Modal>
        </div>
    );
}

export default ChooseCategoryModal;