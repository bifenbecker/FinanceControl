const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'banks';

function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export async function create_bank(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/create-bank`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token')
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
    if(response.status === 401){
        logout();
        window.location.reload();
    }
    return response;
}

export async function bank_list(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/list`, {
                headers: {
                    "jwt-assertion": localStorage.getItem('access_token')
                }
            })
    if(response.status === 401){
        logout();
        window.location.reload();
    }
    return response;
}