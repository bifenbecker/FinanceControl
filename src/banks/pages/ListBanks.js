import React, {useEffect, useState} from 'react';
import { bank_list } from '../utils';

const Bank = (bank) => {

    const title = (
        <ul>
            {bank.name}
        </ul>
    );

    const body = (
        <div>
            {bank.balance}
        </div>
    );

    return (
        <div>
            {title}
            <hr />
            {body}
        </div>
    );
}


const ListBanks = (props) => {
    const [bankList, setBankList] = useState(undefined);

    useEffect(() => {
        (
            async () => {
                const response = await bank_list();
                const content = await response.json();
                if(response.status === 401){
                    window.location.reload();
                }
                else if(response.status === 200){
                    setBankList(content)
                }
                
            }
        )();
    }, []);

    const list = bankList.map((bank) => <Bank bank={bank}/>)
    return (
        <div>
            List
            {bankList?
                {list}
            :
             ''}
        </div>
    );
}

export default ListBanks;