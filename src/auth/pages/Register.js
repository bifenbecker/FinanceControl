import React, {SyntheticEvent, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { register } from '../utils';


const Register = (props) => {
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorUserName, setErrorUserName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    
    const validate_date = (name: string, email: string, password: string, username: string) => {
        
        if(username.length === 0){
            setErrorUserName('username is empty');
            return false;
        }

        if(name.length === 0){
            setErrorName('Name is empty');
            return false;
        }
        else if(name.length < 4){
            setErrorName('Name is too short');
            return false;
        }
        
        if(password.length === 0){
            setErrorPassword('Password is empty');
            return false;
        }
        else if(password.length < 4){
            setErrorPassword('Password is too easy');
            return false;
        }
            
        
        if(email.length === 0){
            setErrorEmail('Email is empty');
            return false;
        }
        else if(email.search(/\S+@[\S+.]+\S{2,4}/) === -1){
            setErrorEmail('Incorrect email');
            return false;
        }
        else{
            email = email.replaceAll(/\s/g,'');
        }
        return true;
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setErrorName('');
        setErrorPassword('');
        setErrorEmail('');

        if(validate_date(name, email, password, username) === true){
            const response = await register(JSON.stringify({
                username,
                name,
                email,
                password
            }));
            const content = await response.json();
            if(content.username !== undefined){
                setErrorUserName(content.username[0]);
            }
            if(content.email !== undefined){
                setErrorEmail(content.email[0]);
            }
            if(response.status === 201){
                props.setNavValue('2');
            }
            
        }
        
    }

    return (
        <form>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    required
                    id="outlined-required"
                    label="username Required"
                    placeholder="Username"
                    helperText={errorUserName}
                    onChange={e => setUserName(e.target.value)} 
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Name Required"
                    placeholder="Name"
                    helperText={errorName}
                    onChange={e => setName(e.target.value)} 
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email Required"
                    placeholder="Email"
                    helperText={errorEmail}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password Required"
                    placeholder="Password"
                    helperText={errorPassword}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </Box>
            <Button variant="outlined" onClick={submit}>Submit</Button>
 
        </form>
    );
};

export default Register;