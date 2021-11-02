import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import { Switch } from 'react-router-dom'

import './App.css';
import Nav from "./components/Nav";

import { get_user } from './utils';


function App() {
    const [user, setUser] = useState(undefined);


    useEffect(() => {
          (
            async () => {
              const response = await get_user(
                JSON.stringify({
                  access_token: localStorage.getItem('access_token')
                  })
              )

              
              if(response.status === 200){
                const content = await response.json();
                setUser(content);

              }
              else if(response.status === 404 || response.status === 401){
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setUser(undefined);

              }
              else if(response.status === 423){
                setUser(undefined);
              }
              
            }
          )();
    }, [setUser]);
  
    return (
        <div className="App">
            <BrowserRouter>
                <Nav user={user} setUser={setUser} />
            
                <Switch>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;