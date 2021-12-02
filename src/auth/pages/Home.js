import React, { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

import { delete_user, edit_user } from '../utils';


const UserInfo = (props) => {
    let list;


    if(props.isEdit === false){
        list = <Box sx={{ '& button': { m: 1 } }}>
                    <div className="m-5">
                        <TextField
                            disabled
                            id="standard-disabled"
                            label="Username"
                            defaultValue={props.user.username}
                            variant="standard"
                        />
                    </div>

                    <div className="m-5">
                        <TextField
                            disabled
                            id="standard-disabled"
                            label="Name"
                            defaultValue={props.user.name}
                            variant="standard"
                        />
                    </div>

                    <div className="m-5">
                        <TextField
                            disabled
                            id="standard-disabled"
                            label="Email"
                            defaultValue={props.user.email}
                            variant="standard"
                        />
                    </div>
                </Box>
    }
    else if(props.isEdit === true){
        
        list = <form ref={props.formRef}>
                <Box sx={{ '& button': { m: 1 } }}>
                    <div className="m-5">
                        <TextField
                            id="standard-required"
                            label="Username"
                            defaultValue={props.user.username}
                            variant="standard"
                            onChange={e => props.setUserName(e.target.value)}
                        />
                    </div>

                    <div className="m-5">
                        <TextField
                            id="standard-required"
                            label="Name"
                            defaultValue={props.user.name}
                            variant="standard"
                            onChange={e => props.setName(e.target.value)}
                        />
                    </div>

                    <div className="m-5">
                        <TextField
                            id="standard-required"
                            label="Email"
                            defaultValue={props.user.email}
                            variant="standard"
                            onChange={e => props.setEmail(e.target.value)}
                        />
                    </div>
                </Box>
                </form>
    }

    return (
        <div>
            {props.user? list: ''}
        </div>
    );
}

const Home = (props) => {
    const [isEdit, setEditState] = useState(false);
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const formRef = useRef();


    const confirm_edit = async () => {
        if(props.user !== undefined){
            let new_data = {};
            if(name !== props.user.name && name !== ''){
                new_data['name'] = name;
            }
            if(username !== props.user.username && username !== ''){
                new_data['username'] = username;
            }
            if(email !== props.user.email && email !== ''){
                new_data['email'] = email;
            }
            if(JSON.stringify(new_data) !== '{}' && localStorage.getItem('access_token') !== undefined){
                const request = edit_user;
                let response = await request(new_data);
                if(response !== undefined){
                    if(response.status === 401){
                        props.setUser(undefined);
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                    }
                    else if(response.status === 202){
                        const content = await response.json();
                        props.setUser(content);
                    }
                }
                
            }
            else{
                window.location.reload();
            }       
            setEditState(false);
        }
        else{
            window.location.reload();
        }
    }

    const cancel = () => {
        formRef.current.reset();
        setName('');
        setEmail('');
        setUserName('');
        setEditState(false);
    }

    const deleteUser = async () => {
        if(props.user !== undefined){
            let isDelete = window.confirm('delete');
            if(isDelete === true){
                const request = delete_user;
                let response = await request();
                window.location.reload();
            }
        }
        else{
            window.location.reload();
        }
    }

    let button;

    if(isEdit === false && props.user !== undefined){
        button = <Box sx={{ '& button': { m: 2 } }}>
                    {props.user.is_active?
                    <Button variant="contained" size="small" onClick={() => {setEditState(true)}}>
                        EDIT
                    </Button>
                    : null}
                    <Button variant="contained" size="small" onClick={deleteUser} endIcon={<DeleteIcon />}>
                        DELETE ME
                    </Button>
                </Box>
    }
    else{
        button = <Box sx={{ '& button': { m: 1 } }}>
                    <Button variant="contained" size="small" onClick={confirm_edit}>
                        CONFIRM
                    </Button>
                    <Button variant="contained" size="small" onClick={cancel}>
                        CANCEL
                    </Button>
                </Box>
    }
    return (
        props.user?
        <div>
            {`Hi, ${props.user.name}  ${props.user.is_active? "": ", you are blocked"}`}
            <UserInfo user={props.user} isEdit={isEdit} formRef={formRef} setName={setName} setEmail={setEmail} setUserName={setUserName}/>
            {button}
        </div> 
        :
        <div>
            You are not logged in
        </div>
    );
};


export default Home;