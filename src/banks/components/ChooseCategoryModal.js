import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CategoryList from './CategoryList';
import TextField from '@mui/material/TextField';

import {create_category} from '../utils'

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

const ChooseCategoryModal = (props) => {
    const [categoryNameCreate, setCategoryNameCreate] = React.useState('');
    const [isClickedCreateCategory, setIsClickedCreateCategory] = React.useState(false);

    const handleClose = () => {
        props.setOpen(false);
    }

    const show = () => {
        if(isClickedCreateCategory === true) {
            setIsClickedCreateCategory(false);
        }
        else{
            setIsClickedCreateCategory(true)
        }
    }
    
    const add_category = async (e) => {
        
        if(categoryNameCreate !== ""){
            var name = categoryNameCreate;
            var isIncome = props.isIncome;
            var body = {
                name: name,
                isIncome: isIncome
            }
            const request = await create_category;
            const response = await request(body);
            if(response !== undefined){
                const content = await response.json();
                props.categoryList.push(content);
            }
        }
        setIsClickedCreateCategory(false);
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
                <CategoryList handleClose={handleClose} categoryList={props.categoryList} isIncome={props.isIncome} setCategory={props.setCategory}/>
                
                {
                    isClickedCreateCategory?
                    <Box>
                        <Fab sx={{ color: 'success.dark', bgcolor: '#B9C4C9', mr: 3}} aria-label="add" onClick={add_category}>
                        <AddIcon />
                        </Fab>
                        <TextField
                            label="Create Category"
                            onChange={e => setCategoryNameCreate(e.target.value)}
                            id="formatted-numberformat-input"
                            variant="standard"
                            color="error"
                        />
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

export default ChooseCategoryModal;