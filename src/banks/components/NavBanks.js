import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateBank from '../pages/CreateBank';
import ListBanks from '../pages/ListBanks';
import Bank from '../pages/BankView';



const NavBanks = (props) => {
    const [value, setValue] = useState('1');
    const [activeBank, setActiveBank] = useState(undefined);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab icon={<CreateIcon />} label="CREATE" value="1" />
                    <Tab icon={<ViewListIcon />} label="LIST" value="2" />
                    {activeBank !== undefined? 
                    <Tab icon={<MonetizationOnIcon />} label={activeBank.name} value="3" />
                    :
                    null
                    }
                </TabList>
            </Box>
            <TabPanel value="1"><CreateBank /></TabPanel>
            <TabPanel value="2"><ListBanks setActiveBank={setActiveBank} setValue={setValue}/></TabPanel>
            <TabPanel value="3"><Bank bank={activeBank} setNavValue={props.setNavValue}/></TabPanel>
        </TabContext>
    );
};


export default NavBanks;