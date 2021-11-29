const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'auth';


function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


export async function checkToken(func) {
    return async function(...args){
        let access_token = localStorage.getItem('access_token');
        if(access_token !== null){
            let decoded_jwt = parseJwt(access_token);
            let now = Math.floor(new Date().getTime()/1000);

            if(decoded_jwt.exp < now){
                const response = await fetch(`${HOST}/${SERVICE_NAME}/api/refresh-tokens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: localStorage.getItem('refresh_token')
                    })
                })
                if(response.status === 200){
                    const content = await response.json();
                    localStorage.setItem("access_token", content['access_token']);
                    localStorage.setItem("refresh_token", content['refresh_token']);

                }else{
                    logout();
                }
            }
            
        }

        if(access_token !== null){
            return func(...args);
        }
        else{
            return undefined;
        }
        
    }
}


async function get_user_f(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user`, {
        headers: {"jwt-assertion": localStorage.getItem('access_token')},
    });
    return response;
}
export let get_user = checkToken(get_user_f);


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




async function edit_user_f(body){
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
export let edit_user = checkToken(edit_user_f);


async function delete_user_f(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user`, {
                method: 'DELETE',
                headers: {"jwt-assertion": localStorage.getItem('access_token')},
                credentials: 'include'
            });
    return response;
}
export let delete_user = checkToken(delete_user_f);


export async function get_currencies(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/сurrencies`);
    return response;
}

async function update_settings_f(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user_settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            });
    return response;
}
export let update_settings = checkToken(update_settings_f);


// export async function get_user_settings(){
//     const response = await fetch(`${HOST}/${SERVICE_NAME}/api/user_settings`, {
//                 headers: {
//                     'jwt-assertion': localStorage.getItem('access_token'),
//                 }
//             });
//     return response;
// }