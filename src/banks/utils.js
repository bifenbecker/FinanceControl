import fx from 'money'

const HOST = 'http://localhost:10000';

const SERVICE_NAME = 'bankAccounts';


export function convertValue(from_, to_, value){

    // const response = await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d8299a9b5c4316d93b8ebd864ac72ae4')
    // const content = await response.json();

    fx.base = "EUR";
    // fx.base = content.base;
    
    // fx.settings = {from: "USD", to: "EUR"}
    fx.settings = {from: from_, to: to_}
    // fx.rates = content.rates;
    fx.rates = {
        BTC: 0.000019240079,
        BYN: 2.8171,
        EUR: 1,
        RUB: 83.754387,
        USD: 1.122359
    }
    return to_ === 'BTC' ? fx.convert(Number(value)).toFixed(8) : fx.convert(Number(value)).toFixed(2);
}



function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
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


export async function edit_bill(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/bill`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token')
                },
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
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/categories`, {
        headers: {
            "jwt-assertion": localStorage.getItem('access_token'),
        }
    })
    .catch(error => {
        logout();
    })
    return response;    
}

export async function create_category(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token')
                },
                body: JSON.stringify(body)
            });
    return response;
}

export async function add_operation(body, uuid){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token'),
                    'uuid': uuid
                },
                body: JSON.stringify(body)
            });
    return response;
}


export async function edit_operation(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            });
    return response;
}


export async function operations_of_bill(uuid){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operations-of-bill`, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token'),
                    'uuid': uuid
                }
            });
    return response;
}

export async function my_operations(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operations`, {
                headers: {
                    'jwt-assertion': localStorage.getItem('access_token'),
                }
            });
    return response;
}


