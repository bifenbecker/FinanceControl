const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'auth';


export async function login(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: body
            });
    return response;
}

export async function register(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: body
            });
    return response;
}

export async function get_user(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user`, {
        headers: {"jwt-assertion": localStorage.getItem('access_token')},
    });
    return response;
}


export async function edit_user(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "jwt-assertion": localStorage.getItem('access_token')
                    },
                credentials: 'include',
                body: JSON.stringify(body)
            });
    return response;
}

export async function delete_user(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user`, {
                method: 'DELETE',
                headers: {"jwt-assertion": localStorage.getItem('access_token')},
                credentials: 'include'
            });
    return response;
}