import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { blue, grey, green, deepOrange } from '@mui/material/colors';
import Grid from '@mui/material/Grid';



const OperationPrev = (props) => {

    // React.useEffect(() => {
    //     (
    //         async () => {
    //             await convertValue();
    //         }
    //     )();
    // }, []);
    

    return (
            <List
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    bgcolor: 'white',
                    // position: 'relative',
                    overflow: 'auto',
                    maxHeight: '100%',
                    '& ul': { padding: 0 },
                    
                }}
                component="nav"
                aria-label="secondary category list"
            >
                <ListItemButton onClick={e => {
                    props.setOperationModal(true);
                    props.setSelectedOperation(props.operation)
                }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Grid item xs={6} >
                                <ListItemText 
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 300,
                                        letterSpacing: 0,
                                        color: blue[900],
                                        ml: 2
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: 600,
                                        letterSpacing: 0,
                                        color: grey[900],
                                        ml: 2
                                    }}
                                    primary={props.operation.date} 
                                    secondary={props.operation.category? props.operation.category: "No category"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {props.operation.description !== ""?
                                <ListItemText 
                                    secondaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 400,
                                        letterSpacing: 0,
                                        color: grey[900],
                                        ml: 2
                                    }}
                                    secondary={props.operation.description}
                                />
                                : null
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sx={{ mt: '2%' }}>
                            <ListItemText 
                                primaryTypographyProps={{
                                    fontSize: 19,
                                    fontWeight: 600,
                                    letterSpacing: 0,
                                    color: props.operation.isIncome? green[300] : deepOrange[400],
                                    ml: 2,
                                    
                                }}
                                secondaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: 300,
                                    letterSpacing: 0,
                                    color: grey[900],
                                    ml: 2
                                }}
                                primary={props.operation.isIncome? "+" + props.operation.convertedValue + props.operation.char: "-" + props.operation.convertedValue + props.operation.char}
                                secondary={"Start value: " + props.operation.value + `(${props.operation.currency})`}
                            />
                        </Grid>
                    </Grid>
            </ListItemButton>
            <Divider />
            
            </List>
    );
}

export default OperationPrev;