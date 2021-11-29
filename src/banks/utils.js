import fx from 'money'
import { checkToken } from '../auth/utils';

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


async function create_bill_f(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/create-bill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token')
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
    return response;
}
export let create_bill = checkToken(create_bill_f);


async function edit_bill_f(body){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/bill`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token')
                },
                body: JSON.stringify(body)
    });
    return response;
}
export let edit_bill = checkToken(edit_bill_f);


async function bill_list_f(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/bills/api/list`, {
                headers: {
                    "jwt-assertion": localStorage.getItem('access_token')
                }
            })
    return response;
}
export let bill_list = checkToken(bill_list_f);


async function category_list_f(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/categories`, {
        headers: {
            "jwt-assertion": localStorage.getItem('access_token'),
        }
    })
    return response;    
}
export let category_list = checkToken(category_list_f);


async function create_category_f(body){
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
export let create_category = checkToken(create_category_f);


async function add_operation_f(body, uuid){
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
export let add_operation = checkToken(add_operation_f);


async function edit_operation_f(body){
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
export let edit_operation = checkToken(edit_operation_f);


async function operations_of_bill_f(uuid){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operations-of-bill`, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-assertion': localStorage.getItem('access_token'),
                    'uuid': uuid
                }
            });
    return response;
}
export let operations_of_bill = checkToken(operations_of_bill_f);


async function my_operations_f(){
    const response = await fetch(`${HOST}/${SERVICE_NAME}/operations/api/operations`, {
                headers: {
                    'jwt-assertion': localStorage.getItem('access_token'),
                }
            });
    return response;
}
export let my_operations = checkToken(my_operations_f);


