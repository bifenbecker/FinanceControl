import * as React from 'react';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';



const CategoryList = (props) => {

    const handleListItemClick = (event, category) => {
        props.setCategory(category);
        props.handleClose();
    };
    let list;

    
    if(props.categoryList[0] !== undefined) {
        list = props.categoryList.map((category) => {
            if(props.isIncome === category.isIncome){
                return (
                        <ListItemButton
                        onClick={(event) => handleListItemClick(event, category)}
                        >
                            <ListItemText 
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    letterSpacing: 0,
                                    color: blue[50],
                                    ml: 2
                                }}
                                primary={category.name} 
                            />
                        </ListItemButton>
                    
                    )
            }
        })
    }
    else{
        list = null;
    }

    return (
        <Box sx={{ width: '100%', height: '80%', maxWidth: 360, bgcolor: '#52958B', fontWeight: 800, mb: 2 }} >
            <List
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 360,
                    bgcolor: '#52958B',
                    // position: 'relative',
                    overflow: 'auto',
                    maxHeight: '100%',
                    '& ul': { padding: 0 },
                    
                }}
                component="nav"
                aria-label="secondary category list"
            >
                {
                    list
                }
            </List>
        
        </Box>
        
    );
}

export default CategoryList;