import React, {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

import ChooseCategoryModal from './ChooseCategoryModal';


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


export default function AddOperation(props) {
    const [navValue, setNavValue] = useState('1');
    const [isIncome, setIsIncome] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [bank, setBank] = React.useState(undefined);
    const [date, setDate] = React.useState(new Date());
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState('');

    const [openChooseCategoryModal, setChooseCategoryModal] = React.useState(false);
    
    const submit = () => {

    }
    const handleChange = (event, newValue) => {
        setNavValue(newValue);
    };
    const AddForm = <form>
                        <Box sx={{ '& button': { m: 1 } }}>
                            <h1 className="h3 m-5 mt-0 fw-normal">Add operation</h1>
                            <div className="m-5">
                                <TextField
                                    label={isIncome? `+${value}`: `-${value}`}
                                    onChange={e => setValue(e.target.value)}
                                    name={isIncome? "income":"payment"}
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom
                                    }}
                                    variant="standard"
                                    color={isIncome? "success":"warning"}
                                />
                            </div>
                            <div className="m-5">
                                <TextField
                                    id="standard-required"
                                    label="Category"
                                    defaultValue={category}
                                    variant="standard"
                                    // onChange={e => setCategory(e.target.value)}
                                    onClick={e => {setChooseCategoryModal(true)}}
                                />
                                <ChooseCategoryModal openModal={openChooseCategoryModal} setOpen={setChooseCategoryModal} setCategory={setCategory} isIncome={isIncome}/>
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

                            <div class="row">
                                <div class="col text-center">
                                <Button variant="outlined" onClick={submit}>CREATE</Button>
                                <p className="mt-5">
                                    {error !== ''? error: ''}
                                </p>
                                </div>
                            </div>

                        </Box>
                    </form>

    return (
        <TabContext value={navValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                {/* icon={} */}
                    <Tab label="PAYMENT" value="1" onClick={e => setIsIncome(false)}/> 
                    <Tab label="INCOME" value="2" onClick={e => setIsIncome(true)}/>
                    <Tab label="TRANSFER" value="3"/>
                </TabList>
            </Box>
            <TabPanel value="1">{AddForm}</TabPanel>
            <TabPanel value="2">{AddForm}</TabPanel>
            <TabPanel value="3">TRANSFER</TabPanel>
        </TabContext>
        
    );
}