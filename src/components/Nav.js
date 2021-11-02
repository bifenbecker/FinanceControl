import React, {useState} from 'react';
import Box from '@mui/material/Box';

import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from '../pages/Home';


const Nav = (props) => {
    const [value, setValue] = useState('1');

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setValue('1');
        props.setUser(undefined);
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let tablist;

    if(props.user !== undefined){
        tablist = <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab icon={<HomeIcon />} label="HOME" value="1" />
        <Tab icon={<LogoutIcon />} label="LOGOUT" value="4" onClick={logout}/>
    </TabList>
    }
    else{
        tablist = <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab icon={<HomeIcon />} label="HOME" value="1" />
        <Tab icon={<LoginIcon />} label="LOGIN" value="2" />
        <Tab icon={<AppRegistrationIcon />} label="REGISTER" value="3"/>
    </TabList>
    }

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {tablist}
            </Box>
            <TabPanel value="1"><Home user={props.user} setUser={props.setUser}/></TabPanel>
            <TabPanel value="2"><Login setValue={setValue} setUser={props.setUser}/></TabPanel>
            <TabPanel value="3"><Register setValue={setValue}/></TabPanel>
        </TabContext>
    );
};


export default Nav;