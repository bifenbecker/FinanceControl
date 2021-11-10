const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'banks';

export async function create_bank(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/create-bank`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'jwt-assertion': localStorage.getItem('access_token')},
                credentials: 'include',
                body: JSON.stringify(body)
            });
    return response;
}

export async function bank_list(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/api/list`, {
                headers: {
                    "jwt-assertion": localStorage.getItem('access_token')
                }
            })
    return response;
}