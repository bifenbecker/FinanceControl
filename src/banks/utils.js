const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'banks';

export async function create_bank(body){
    body['access_token'] = localStorage.getItem('access_token');
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/create-bank`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(body)
            });
    return response;
}

export async function bank_list(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/list`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    access_token: localStorage.getItem('access_token')
                })
            });
    return response;
}