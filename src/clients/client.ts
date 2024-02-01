import { getCookie } from "utills/cookie";
import {serverDomain} from "../config";
import {Cookies} from 'react-cookie';

const cookies = new Cookies();
// const cookies = new Cookies();
interface ClientInterface {
    domain?: string,
    prefix?: string
}

export default class Client {
    protected domain: string = serverDomain
    protected prefix: string = '/'

    constructor(clientInterface: ClientInterface) {
        this.domain = clientInterface.domain ?? this.domain;
        this.prefix = clientInterface.prefix ?? this.prefix;
    }
    getUrl(endpoint: string): string
    {
        return this.domain+this.prefix+endpoint;
    }

    private options(init?: RequestInit): RequestInit
    {
        init = init ?? {};
        // init.credentials =  'include';
        init.credentials = "same-origin";
        console.log('token',cookies.get('authorization'));
        if(init.headers == undefined){
            init.headers = {
                authorization: `${getCookie('authorization')}`
            };
        }else{
            //@ts-ignore
            init.headers["authorization"] = `${getCookie('authorization')}`;
        }
        console.log(init);
        return init;
    }

    fetch(endpoint: string, init?:  RequestInit){
        const url = this.getUrl(endpoint);
        console.log( {...init, ...{
            credentials: 'same-origin'
        }});
        return fetch(url, {...init, ...{
            credentials: 'same-origin'
        }});
    }
}

