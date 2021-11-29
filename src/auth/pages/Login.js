import React, {SyntheticEvent, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { login, get_user } from '../utils';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const validate_date = (email: string, password: string) => {

        if(password.length === 0){
            setErrorPassword('Password is empty')
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
        setErrorPassword('');
        setErrorEmail('');

        if (validate_date(email, password) === true){
            let response = await login(JSON.stringify({
                email,
                password
            }));
            let content = await response.json();
            if(content.password !== undefined){
                setErrorPassword(content.password);
            }
            else if(content.email !== undefined){
                setErrorEmail(content.email);
            }
            else{
                localStorage.setItem("access_token", content['access_token']);
                localStorage.setItem("refresh_token", content['refresh_token']);
                props.setNavValue('1');
                let request = await get_user;
                response = await request();
                content = await response.json();
                props.setUser(content);
            }
        }
    }

    return (
        <div>
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>
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
            <Button variant="outlined" onClick={submit}>Sign in</Button>
 
        </div>
    );
};

export default Login;