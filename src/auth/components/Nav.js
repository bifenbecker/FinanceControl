import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Login from "../pages/Login";
import Register from "../pages/Register";
import ListBills from '../../banks/pages/ListBills';

import ProfileMenu from './ProfileMenu';
import BillsMenu from '../../banks/components/BillsMenu';
import OperationsMenu from '../../banks/components/OperationsMenu';
import BillView from '../../banks/pages/BillView';
import MyOperations from '../../banks/pages/MyOperations';


const Nav = (props) => {
    const [value, setNavValue] = useState('1');
    const [activeBill, setActiveBill] = useState(undefined);

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setNavValue('2');
        props.setUser(undefined);
    }


    const handleChange = (event, newValue) => {
        setNavValue(newValue);
    };

    let tablist;

    if(props.user !== undefined && props.user.is_active === true){
        tablist = <TabList onChange={handleChange} aria-label="lab API tabs example">
        <ProfileMenu logout={logout} user={props.user} setUser={props.setUser} />
        <Tab icon={<HomeIcon />} label="HOME" value="1" />
        <BillsMenu settings={props.user?props.user.settings: undefined} setNavValue={setNavValue}/>
        <OperationsMenu settings={props.user?props.user.settings: undefined} setNavValue={setNavValue}/>
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
            <TabPanel value="1">Home</TabPanel>
            <TabPanel value="2"><Login setNavValue={setNavValue} setUser={props.setUser}/></TabPanel>
            <TabPanel value="3"><Register setNavValue={setNavValue}/></TabPanel>
            <TabPanel value="4"><ListBills settings={props.user?props.user.settings: undefined} setValue={setNavValue} setActiveBill={setActiveBill}/></TabPanel>
            <TabPanel value="5"><BillView settings={props.user?props.user.settings: undefined} bill={activeBill} setNavValue={setNavValue} setActiveBill={setActiveBill}/></TabPanel>
            <TabPanel value="6"><MyOperations settings={props.user?props.user.settings: undefined}/></TabPanel>
        </TabContext>
    );
};


export default Nav;