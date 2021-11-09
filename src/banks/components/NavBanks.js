import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateBank from '../pages/CreateBank';
import ListBanks from '../pages/ListBanks';



const NavBanks = (props) => {
    const [value, setValue] = useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab icon={<CreateIcon />} label="CREATE" value="1" />
                    <Tab icon={<ViewListIcon />} label="LIST" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><CreateBank /></TabPanel>
            <TabPanel value="2"><ListBanks /></TabPanel>

        </TabContext>
    );
};


export default NavBanks;