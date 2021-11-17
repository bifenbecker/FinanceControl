const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'bankAccounts';

function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export async function create_bill(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/create-bill`, {
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

export async function bill_list(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/list`, {
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

export async function category_list(){
    try{
        const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/categories`, {
            headers: {
                "jwt-assertion": localStorage.getItem('access_token'),
            }
        })
        return response;
    }
    catch{
        window.location.reload();
    }
}